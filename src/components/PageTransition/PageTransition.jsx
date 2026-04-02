import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import styles from './PageTransition.module.css'

export const PageTransitionContext = createContext({
  freezeHomeDither: false,
  homeDitherFadeOut: false,
})

const COVER_DURATION = 400
const REVEAL_DURATION = 400

export function PageTransition({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [overlayState, setOverlayState] = useState('idle') // idle | cover | reveal
  const coverTimerRef = useRef(null)
  const revealTimerRef = useRef(null)

  useEffect(() => {
    if (location.pathname === displayLocation.pathname && location.search === displayLocation.search) {
      return undefined
    }

    setOverlayState('cover')
    if (coverTimerRef.current) window.clearTimeout(coverTimerRef.current)
    if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current)

    coverTimerRef.current = window.setTimeout(() => {
      setDisplayLocation(location)
      setOverlayState('reveal')
      revealTimerRef.current = window.setTimeout(() => setOverlayState('idle'), REVEAL_DURATION)
    }, COVER_DURATION)

    return () => {
      if (coverTimerRef.current) window.clearTimeout(coverTimerRef.current)
      if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current)
    }
  }, [location, displayLocation])

  const routesElement = useMemo(() => {
    const childrenArray = Children.toArray(children)
    const routesChild = childrenArray.find(
      (child) =>
        isValidElement(child) &&
        child.type &&
        ((child.type.displayName && child.type.displayName === 'Routes') ||
          child.type.name === 'Routes')
    )

    if (!routesChild) {
      return children
    }

    return cloneElement(routesChild, { location: displayLocation })
  }, [children, displayLocation])

  return (
    <PageTransitionContext.Provider value={{ freezeHomeDither: false, homeDitherFadeOut: false }}>
      <div className={styles.wrapper}>
        <div className={`${styles.bar} ${styles[overlayState]}`} />
        <div className={styles.pages}>{routesElement}</div>
      </div>
    </PageTransitionContext.Provider>
  )
}
