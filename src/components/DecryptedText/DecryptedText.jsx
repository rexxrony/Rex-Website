/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { motion } from 'motion/react'

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0,
  },
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click')
  const [direction, setDirection] = useState('forward')

  const containerRef = useRef(null)
  const orderRef = useRef([])
  const pointerRef = useRef(0)

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
      : characters.split('')
  }, [useOriginalCharsOnly, text, characters])

  const shuffleText = useCallback(
    (originalText, currentRevealed) => {
      return originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (currentRevealed.has(index)) return originalText[index]
          return availableChars[Math.floor(Math.random() * availableChars.length)]
        })
        .join('')
    },
    [availableChars]
  )

  const computeOrder = useCallback(
    length => {
      const order = []
      if (length <= 0) return order

      if (revealDirection === 'start') {
        for (let index = 0; index < length; index += 1) order.push(index)
        return order
      }

      if (revealDirection === 'end') {
        for (let index = length - 1; index >= 0; index -= 1) order.push(index)
        return order
      }

      const middle = Math.floor(length / 2)
      let offset = 0

      while (order.length < length) {
        if (offset % 2 === 0) {
          const index = middle + offset / 2
          if (index >= 0 && index < length) order.push(index)
        } else {
          const index = middle - Math.ceil(offset / 2)
          if (index >= 0 && index < length) order.push(index)
        }
        offset += 1
      }

      return order.slice(0, length)
    },
    [revealDirection]
  )

  const fillAllIndices = useCallback(() => {
    const allIndices = new Set()
    for (let index = 0; index < text.length; index += 1) allIndices.add(index)
    return allIndices
  }, [text])

  const removeRandomIndices = useCallback((set, count) => {
    const indices = Array.from(set)
    for (let index = 0; index < count && indices.length > 0; index += 1) {
      const randomIndex = Math.floor(Math.random() * indices.length)
      indices.splice(randomIndex, 1)
    }
    return new Set(indices)
  }, [])

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set()
    setRevealedIndices(emptySet)
    setDisplayText(shuffleText(text, emptySet))
    setIsDecrypted(false)
  }, [text, shuffleText])

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length)
      pointerRef.current = 0
    }
    setRevealedIndices(new Set())
    setDirection('forward')
    setIsAnimating(true)
  }, [sequential, computeOrder, text.length])

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse()
      pointerRef.current = 0
      const filled = fillAllIndices()
      setRevealedIndices(filled)
      setDisplayText(shuffleText(text, filled))
    } else {
      const filled = fillAllIndices()
      setRevealedIndices(filled)
      setDisplayText(shuffleText(text, filled))
    }
    setDirection('reverse')
    setIsAnimating(true)
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text])

  useEffect(() => {
    if (!isAnimating) return undefined

    let interval
    let currentIteration = 0

    const getNextIndex = revealedSet => {
      const textLength = text.length

      switch (revealDirection) {
        case 'start':
          return revealedSet.size
        case 'end':
          return textLength - 1 - revealedSet.size
        case 'center': {
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex
          }

          for (let index = 0; index < textLength; index += 1) {
            if (!revealedSet.has(index)) return index
          }
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    interval = window.setInterval(() => {
      setRevealedIndices(previous => {
        if (sequential) {
          if (direction === 'forward') {
            if (previous.size < text.length) {
              const nextIndex = getNextIndex(previous)
              const next = new Set(previous)
              next.add(nextIndex)
              setDisplayText(shuffleText(text, next))
              return next
            }

            window.clearInterval(interval)
            setIsAnimating(false)
            setIsDecrypted(true)
            return previous
          }

          if (direction === 'reverse') {
            if (pointerRef.current < orderRef.current.length) {
              const indexToRemove = orderRef.current[pointerRef.current]
              pointerRef.current += 1
              const next = new Set(previous)
              next.delete(indexToRemove)
              setDisplayText(shuffleText(text, next))
              if (next.size === 0) {
                window.clearInterval(interval)
                setIsAnimating(false)
                setIsDecrypted(false)
              }
              return next
            }

            window.clearInterval(interval)
            setIsAnimating(false)
            setIsDecrypted(false)
            return previous
          }
        } else {
          if (direction === 'forward') {
            setDisplayText(shuffleText(text, previous))
            currentIteration += 1
            if (currentIteration >= maxIterations) {
              window.clearInterval(interval)
              setIsAnimating(false)
              setDisplayText(text)
              setIsDecrypted(true)
            }
            return previous
          }

          let currentSet = previous
          if (currentSet.size === 0) {
            currentSet = fillAllIndices()
          }

          const removeCount = Math.max(
            1,
            Math.ceil(text.length / Math.max(1, maxIterations))
          )
          const nextSet = removeRandomIndices(currentSet, removeCount)
          setDisplayText(shuffleText(text, nextSet))
          currentIteration += 1

          if (nextSet.size === 0 || currentIteration >= maxIterations) {
            window.clearInterval(interval)
            setIsAnimating(false)
            setIsDecrypted(false)
            setDisplayText(shuffleText(text, new Set()))
            return new Set()
          }

          return nextSet
        }

        return previous
      })
    }, speed)

    return () => window.clearInterval(interval)
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    shuffleText,
    direction,
    fillAllIndices,
    removeRandomIndices,
    characters,
    useOriginalCharsOnly,
  ])

  const handleClick = () => {
    if (animateOn !== 'click') return

    if (clickMode === 'once') {
      if (isDecrypted) return
      setDirection('forward')
      triggerDecrypt()
    }

    if (clickMode === 'toggle') {
      if (isDecrypted) {
        triggerReverse()
      } else {
        setDirection('forward')
        triggerDecrypt()
      }
    }
  }

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return

    setRevealedIndices(new Set())
    setIsDecrypted(false)
    setDisplayText(text)
    setDirection('forward')
    setIsAnimating(true)
  }, [isAnimating, text])

  const resetToPlainText = useCallback(() => {
    setIsAnimating(false)
    setRevealedIndices(new Set())
    setDisplayText(text)
    setIsDecrypted(true)
    setDirection('forward')
  }, [text])

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return undefined

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt()
            setHasAnimated(true)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [animateOn, hasAnimated, triggerDecrypt])

  useEffect(() => {
    if (animateOn === 'click') {
      encryptInstantly()
    } else {
      setDisplayText(text)
      setIsDecrypted(true)
    }
    setRevealedIndices(new Set())
    setDirection('forward')
  }, [animateOn, text, encryptInstantly])

  const animateProps =
    animateOn === 'hover' || animateOn === 'inViewHover'
      ? {
          onMouseEnter: triggerHoverDecrypt,
          onMouseLeave: resetToPlainText,
        }
      : animateOn === 'click'
        ? {
            onClick: handleClick,
          }
        : {}

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...animateProps}
      {...props}
    >
      <span style={styles.srOnly}>{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || (!isAnimating && isDecrypted)

          return (
            <span
              key={`${char}-${index}`}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
