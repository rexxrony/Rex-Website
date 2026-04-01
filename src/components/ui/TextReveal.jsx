/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react'

export function TextReveal({
  children,
  className = '',
  duration = 0.38,
  stagger = 14,
  threshold = 0.08,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  const tokens = useMemo(() => {
    const text = typeof children === 'string' ? children : String(children ?? '')
    return text.split(/(\s+)/)
  }, [children])

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return (
    <span ref={ref} className={className}>
      {tokens.map((token, index) =>
        /^\s+$/.test(token) ? (
          <span key={`space-${index}`}>{token}</span>
        ) : (
          <span
            key={`token-${index}`}
            style={{
              display: 'inline-block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(0.55em)',
              filter: visible ? 'blur(0px)' : 'blur(6px)',
              transition:
                `opacity ${duration}s ease, transform ${duration}s ease, filter ${duration}s ease`,
              transitionDelay: `${index * stagger}ms`,
              willChange: 'opacity, transform, filter',
            }}
          >
            {token}
          </span>
        )
      )}
    </span>
  )
}
