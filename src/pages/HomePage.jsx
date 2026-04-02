import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dither from '../components/Dither/Dither'
import { Loader } from '../components/Loader/Loader'
import styles from './HomePage.module.css'

let hasShownHomeLoader = false

export function HomePage() {
  const [isContentReady, setContentReady] = useState(false)
  const [minDelayPassed, setMinDelayPassed] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(() => !hasShownHomeLoader)

  useEffect(() => {
    let isActive = true
    let fallback = null

    const markReady = () => {
      requestAnimationFrame(() => {
        if (isActive) {
          setContentReady(true)
        }
      })
    }

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(markReady)
    } else {
      fallback = setTimeout(markReady, 420)
    }

    return () => {
      isActive = false
      if (fallback) {
        clearTimeout(fallback)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [])

  useEffect(() => {
    if (!loaderVisible) return
    if (isContentReady && minDelayPassed) {
      hasShownHomeLoader = true
      setLoaderVisible(false)
    }
  }, [loaderVisible, isContentReady, minDelayPassed])

  const shouldShowLoader = loaderVisible && !(isContentReady && minDelayPassed)

  return (
    <div className={styles.home}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={5.2}
          waveAmplitude={0.2}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      {shouldShowLoader && <Loader />}
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.nameBlock}>
            <p className={styles.body}>REX</p>
            <p className={styles.subBody}>RONY JACOB</p>
          </div>
          <br />
          <ul className={styles.links}>
            <li>
              <Link to="/dev" className={styles.linkButton}>
                Dev Portfolio
              </Link>
            </li>
            <li>
              <Link to="/photography" className={styles.linkButton}>
                Photography
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
