import { useEffect, useState } from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import AnimatedContent from '../components/AnimatedContent/AnimatedContent'
import { Footer } from '../components/Footer/Footer'
import { Navbar } from '../components/Navbar/Navbar'
import profilePic from '../assets/rexcutout.png'
import styles from './PhotographyPage.module.css'

export function PhotographyPage() {
  const [images, setImages] = useState([])
  const [displayedCount, setDisplayedCount] = useState(16)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const imagesPerLoad = 16

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageModules = import.meta.glob('../assets/photography/*', {
          eager: true,
          import: 'default',
        })

        const loadedImages = Object.entries(imageModules).map(([path, url]) => ({
          id: path,
          src: url,
          name: path.split('/').pop(),
        }))

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

  return (
    <div className={styles.page}>
      <Navbar showLinks={false} />

      <div className={styles.profileHeader}>
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
                {displayedImages.map((image, index) => (
                  <AnimatedContent
                    key={image.id}
                    className={styles.imageWrapper}
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
                  >
                    <img src={image.src} alt={image.name} className={styles.galleryImage} />
                    <div className={styles.imageOverlay}></div>
                  </AnimatedContent>
                ))}
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

      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImageIndex(null)}>
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
        </div>
      )}

      <Footer />
    </div>
  )
}
