import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import AnimatedContent from '../components/AnimatedContent/AnimatedContent'
import Grainient from '../components/Grainient/Grainient'
import { Footer } from '../components/Footer/Footer'
import { Navbar } from '../components/Navbar/Navbar'
import profilePic from '../assets/rexcutout.png'
import styles from './PhotographyPage.module.css'

export function PhotographyPage() {
  const [images, setImages] = useState([])
  const [displayedCount, setDisplayedCount] = useState(16)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(false)
  const [hasShownSwipeHint, setHasShownSwipeHint] = useState(false)
  const imagesPerLoad = 16
  const lightboxRef = useRef(null)
  const touchStartX = useRef(0)

  useEffect(() => setIsClient(true), [])

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageModules = import.meta.glob('../assets/photography/*', {
          eager: true,
          import: 'default',
        })

        const loadMeta = async (url) => {
          return new Promise((resolve) => {
            const img = new Image()
            const handleResolve = () => {
              const width = img.naturalWidth || 1
              const height = img.naturalHeight || 1
              resolve({ width, height })
            }

            img.src = url

            if (img.complete) {
              handleResolve()
            } else {
              img.onload = handleResolve
              img.onerror = handleResolve
            }
          })
        }

        const extractNumber = (name) => {
          const match = name.match(/(\d+)(?=\D*$)/)
          return match ? parseInt(match[1], 10) : 0
        }

        const entries = Object.entries(imageModules)
        const loadedImages = await Promise.all(
          entries.map(async ([path, url]) => {
            const { width, height } = await loadMeta(url)
            return {
              id: path,
              src: url,
              name: path.split('/').pop(),
              width,
              height,
              orientation: width >= height ? 'horizontal' : 'vertical',
            }
          })
        )

        loadedImages.sort((a, b) => extractNumber(b.name) - extractNumber(a.name))

        setImages(loadedImages)
      } catch (error) {
        console.error('Error loading images:', error)
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + imagesPerLoad)
  }

  const handlePrevious = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null
  const displayedImages = images.slice(0, displayedCount)
  const hasMore = displayedCount < images.length

  useEffect(() => {
    if (selectedImageIndex === null) return
    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = body.style.overflow

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      html.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
    }
  }, [selectedImageIndex])

  useEffect(() => {
    if (selectedImageIndex === null) return

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious()
      } else if (event.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, handlePrevious, handleNext])

  useEffect(() => {
    if (selectedImageIndex === null) {
      setShowSwipeHint(false)
      return undefined
    }

    if (typeof window === 'undefined' || window.innerWidth > 640) {
      setShowSwipeHint(false)
      return undefined
    }

    setShowSwipeHint(true)
    const timer = setTimeout(() => {
      setShowSwipeHint(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [selectedImageIndex])

  useEffect(() => {
    if (selectedImageIndex === null) return
    if (typeof window === 'undefined' || window.innerWidth > 640) return undefined

    const container = lightboxRef.current
    if (!container) return undefined

    const handleTouchStart = (event) => {
      touchStartX.current = event.touches[0].clientX
    }

    const handleTouchEnd = (event) => {
      const delta = event.changedTouches[0].clientX - touchStartX.current
      const threshold = 30
      if (delta > threshold) {
        handlePrevious()
      } else if (delta < -threshold) {
        handleNext()
      }
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [selectedImageIndex, handlePrevious, handleNext])

  useEffect(() => {
    if (
      selectedImageIndex === null ||
      hasShownSwipeHint ||
      typeof window === 'undefined' ||
      window.innerWidth > 640
    ) {
      setShowSwipeHint(false)
      return undefined
    }

    setShowSwipeHint(true)
    const timer = setTimeout(() => {
      setShowSwipeHint(false)
      setHasShownSwipeHint(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [selectedImageIndex, hasShownSwipeHint])

  const lightbox = selectedImage ? (
    <div ref={lightboxRef} className={styles.lightbox} onClick={() => setSelectedImageIndex(null)}>
      <button
        className={styles.closeButton}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedImageIndex(null)
        }}
      >
        ✕
      </button>
      <button
        className={styles.prevButton}
        onClick={(e) => {
          e.stopPropagation()
          handlePrevious()
        }}
        disabled={selectedImageIndex === 0}
      >
        ❮
      </button>
      <img
        key={selectedImage.id}
        src={selectedImage.src}
        alt={selectedImage.name}
        className={styles.lightboxImage}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className={styles.nextButton}
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        disabled={selectedImageIndex === images.length - 1}
      >
        ❯
      </button>
      {showSwipeHint && (
        <div className={styles.swipeHint}>Swipe to navigate</div>
      )}
    </div>
  ) : null

  return (
    <div className={styles.page}>
      <Navbar showLinks={false} />

      <div className={styles.profileHeader}>
        <Grainient
          timeSpeed={0.2}
          color1="#ffffff"
          color2="#000000"
          color3="#7a7a7a"
          colorBalance={-0.2}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.06}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
          className={styles.grainientBackground}
        />
        <div className={styles.profileContent}>
          <div className={styles.profilePicWrapper}>
            <img src={profilePic} alt="Profile" className={styles.profilePic} />
          </div>
          <div className={styles.headerInfo}>
            <div className={styles.nameBlock}>
              <h1 className={styles.username}>Rex Rony Jacob</h1>
              <p className={styles.imageCount}>{images.length} Images</p>
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://www.youtube.com/@rexronyjacob"
                target="_blank"
                rel="noreferrer"
                className={styles.iconButton}
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.instagram.com/re.x.x"
                target="_blank"
                rel="noreferrer"
                className={styles.iconButton}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.gallery}>
          {loading ? (
            <div className={styles.loadingMessage}>Loading gallery...</div>
          ) : images.length === 0 ? (
            <div className={styles.emptyMessage}>
              <p>No images found.</p>
            </div>
          ) : (
            <>
              <div className={styles.gridGallery}>
                {displayedImages.map((image, index) => {
                  const orientationClass =
                    image.orientation === 'horizontal'
                      ? styles.imageWrapperHorizontal
                      : styles.imageWrapperVertical
                  const aspectRatioStyle =
                    image.width && image.height
                      ? { aspectRatio: `${image.width} / ${image.height}` }
                      : undefined

                  return (
                    <AnimatedContent
                      key={image.id}
                      className={`${styles.imageWrapper} ${orientationClass}`}
                      animateOn="load"
                      distance={40}
                      direction="vertical"
                      duration={0.38}
                      ease="power3.out"
                      initialOpacity={0}
                      animateOpacity
                      scale={0.985}
                      delay={(index % imagesPerLoad) * 0.015}
                      onClick={() => setSelectedImageIndex(index)}
                      style={aspectRatioStyle}
                    >
                      <img src={image.src} alt={image.name} className={styles.galleryImage} />
                      <div className={styles.imageOverlay}></div>
                    </AnimatedContent>
                  )
                })}
              </div>
              {hasMore && (
                <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                  LOAD MORE
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isClient && lightbox && createPortal(lightbox, document.body)}

      <Footer />
    </div>
  )
}
