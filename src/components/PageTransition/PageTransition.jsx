import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import gsap from 'gsap'
import styles from './PageTransition.module.css'

export function PageTransition({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const transitionRef = useRef(null)
  const hasMounted = useRef(false)
  const animation = useRef(null)
  const prevPath = useRef(location.pathname)
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (!transitionRef.current) {
      return
    }

    if (animation.current) {
      animation.current.kill()
    }

    if (!hasMounted.current) {
      hasMounted.current = true
      gsap.set(transitionRef.current, { autoAlpha: 1, xPercent: 0 })
      prevPath.current = location.pathname
      return
    }

    const isRefreshOnHome =
      navigationType === 'POP' && location.pathname === '/' && prevPath.current === '/'

    if (isRefreshOnHome) {
      prevPath.current = location.pathname
      setDisplayLocation(location)
      return
    }

    const timeline = gsap.timeline({
      defaults: { duration: 0.55, ease: 'power3.inOut' },
    })

    const goingHome = location.pathname === '/' && prevPath.current !== '/'
    const exitDirection = goingHome ? 100 : -100
    const enterStart = goingHome ? -100 : 100

    timeline.to(transitionRef.current, { xPercent: exitDirection, autoAlpha: 0 })
    timeline.add(() => {
      setDisplayLocation(location)
      prevPath.current = location.pathname
    })
    timeline.set(transitionRef.current, { xPercent: enterStart, autoAlpha: 1 })
    timeline.to(transitionRef.current, { xPercent: 0 })

    animation.current = timeline

    return () => {
      timeline.kill()
      animation.current = null
    }
  }, [location, navigationType])

  return (
    <div ref={transitionRef} className={styles.transitionWrapper} aria-live="polite">
      {typeof children === 'function' ? children(displayLocation) : children}
    </div>
  )
}
