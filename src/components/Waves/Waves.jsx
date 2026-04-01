import { useEffect, useRef } from 'react'
import './Waves.css'

class Grad {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  dot2(x, y) {
    return this.x * x + this.y * y
  }
}

class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ]
    this.p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
      69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94,
      252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171,
      168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60,
      211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1,
      216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
      164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126,
      255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
      119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253,
      19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242,
      193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192,
      214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236,
      205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ]
    this.perm = new Array(512)
    this.gradP = new Array(512)
    this.seed(seed)
  }

  seed(seed) {
    let nextSeed = seed
    if (nextSeed > 0 && nextSeed < 1) nextSeed *= 65536
    nextSeed = Math.floor(nextSeed)
    if (nextSeed < 256) nextSeed |= nextSeed << 8

    for (let index = 0; index < 256; index += 1) {
      const value =
        index & 1
          ? this.p[index] ^ (nextSeed & 255)
          : this.p[index] ^ ((nextSeed >> 8) & 255)
      this.perm[index] = this.perm[index + 256] = value
      this.gradP[index] = this.gradP[index + 256] = this.grad3[value % 12]
    }
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  lerp(a, b, t) {
    return (1 - t) * a + t * b
  }

  perlin2(x, y) {
    let gridX = Math.floor(x)
    let gridY = Math.floor(y)
    const localX = x - gridX
    const localY = y - gridY
    gridX &= 255
    gridY &= 255

    const n00 = this.gradP[gridX + this.perm[gridY]].dot2(localX, localY)
    const n01 = this.gradP[gridX + this.perm[gridY + 1]].dot2(localX, localY - 1)
    const n10 = this.gradP[gridX + 1 + this.perm[gridY]].dot2(localX - 1, localY)
    const n11 = this.gradP[gridX + 1 + this.perm[gridY + 1]].dot2(localX - 1, localY - 1)
    const fadeX = this.fade(localX)

    return this.lerp(this.lerp(n00, n10, fadeX), this.lerp(n01, n11, fadeX), this.fade(localY))
  }
}

export default function Waves({
  lineColor = 'black',
  backgroundColor = 'transparent',
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = '',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 })
  const noiseRef = useRef(new Noise(Math.random()))
  const linesRef = useRef([])
  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  })
  const configRef = useRef({
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  })
  const frameIdRef = useRef(null)

  useEffect(() => {
    configRef.current = {
      lineColor,
      waveSpeedX,
      waveSpeedY,
      waveAmpX,
      waveAmpY,
      friction,
      tension,
      maxCursorMove,
      xGap,
      yGap,
    }
  }, [
    lineColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return undefined

    ctxRef.current = canvas.getContext('2d')

    const setSize = () => {
      boundingRef.current = container.getBoundingClientRect()
      canvas.width = boundingRef.current.width
      canvas.height = boundingRef.current.height
    }

    const setLines = () => {
      const { width, height } = boundingRef.current
      linesRef.current = []
      const outerWidth = width + 200
      const outerHeight = height + 30
      const { xGap: nextXGap, yGap: nextYGap } = configRef.current
      const totalLines = Math.ceil(outerWidth / nextXGap)
      const totalPoints = Math.ceil(outerHeight / nextYGap)
      const xStart = (width - nextXGap * totalLines) / 2
      const yStart = (height - nextYGap * totalPoints) / 2

      for (let line = 0; line <= totalLines; line += 1) {
        const points = []
        for (let point = 0; point <= totalPoints; point += 1) {
          points.push({
            x: xStart + nextXGap * line,
            y: yStart + nextYGap * point,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          })
        }
        linesRef.current.push(points)
      }
    }

    const movePoints = (time) => {
      const lines = linesRef.current
      const mouse = mouseRef.current
      const noise = noiseRef.current
      const {
        waveSpeedX: nextWaveSpeedX,
        waveSpeedY: nextWaveSpeedY,
        waveAmpX: nextWaveAmpX,
        waveAmpY: nextWaveAmpY,
        friction: nextFriction,
        tension: nextTension,
        maxCursorMove: nextMaxCursorMove,
      } = configRef.current

      lines.forEach((points) => {
        points.forEach((point) => {
          const move =
            noise.perlin2(
              (point.x + time * nextWaveSpeedX) * 0.002,
              (point.y + time * nextWaveSpeedY) * 0.0015
            ) * 12

          point.wave.x = Math.cos(move) * nextWaveAmpX
          point.wave.y = Math.sin(move) * nextWaveAmpY

          const dx = point.x - mouse.sx
          const dy = point.y - mouse.sy
          const distance = Math.hypot(dx, dy)
          const limit = Math.max(175, mouse.vs)

          if (distance < limit) {
            const strength = 1 - distance / limit
            const force = Math.cos(distance * 0.001) * strength
            point.cursor.vx += Math.cos(mouse.a) * force * limit * mouse.vs * 0.00065
            point.cursor.vy += Math.sin(mouse.a) * force * limit * mouse.vs * 0.00065
          }

          point.cursor.vx += (0 - point.cursor.x) * nextTension
          point.cursor.vy += (0 - point.cursor.y) * nextTension
          point.cursor.vx *= nextFriction
          point.cursor.vy *= nextFriction
          point.cursor.x += point.cursor.vx * 2
          point.cursor.y += point.cursor.vy * 2
          point.cursor.x = Math.min(nextMaxCursorMove, Math.max(-nextMaxCursorMove, point.cursor.x))
          point.cursor.y = Math.min(nextMaxCursorMove, Math.max(-nextMaxCursorMove, point.cursor.y))
        })
      })
    }

    const moved = (point, withCursor = true) => {
      const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0)
      const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0)
      return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
    }

    const drawLines = () => {
      const { width, height } = boundingRef.current
      const context = ctxRef.current
      if (!context) return

      context.clearRect(0, 0, width, height)
      context.beginPath()
      context.strokeStyle = configRef.current.lineColor

      linesRef.current.forEach((points) => {
        let pointA = moved(points[0], false)
        context.moveTo(pointA.x, pointA.y)
        points.forEach((point, index) => {
          const isLast = index === points.length - 1
          pointA = moved(point, !isLast)
          const pointB = moved(points[index + 1] || points[points.length - 1], !isLast)
          context.lineTo(pointA.x, pointA.y)
          if (isLast) context.moveTo(pointB.x, pointB.y)
        })
      })

      context.stroke()
    }

    const tick = (time) => {
      const mouse = mouseRef.current
      mouse.sx += (mouse.x - mouse.sx) * 0.1
      mouse.sy += (mouse.y - mouse.sy) * 0.1
      const dx = mouse.x - mouse.lx
      const dy = mouse.y - mouse.ly
      const distance = Math.hypot(dx, dy)
      mouse.v = distance
      mouse.vs += (distance - mouse.vs) * 0.1
      mouse.vs = Math.min(100, mouse.vs)
      mouse.lx = mouse.x
      mouse.ly = mouse.y
      mouse.a = Math.atan2(dy, dx)

      movePoints(time)
      drawLines()
      frameIdRef.current = requestAnimationFrame(tick)
    }

    const updateMouse = (x, y) => {
      const mouse = mouseRef.current
      const bounds = boundingRef.current
      mouse.x = x - bounds.left
      mouse.y = y - bounds.top

      if (!mouse.set) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.set = true
      }
    }

    const onResize = () => {
      setSize()
      setLines()
    }

    const onMouseMove = (event) => {
      updateMouse(event.clientX, event.clientY)
    }

    const onTouchMove = (event) => {
      const touch = event.touches[0]
      if (!touch) return
      updateMouse(touch.clientX, touch.clientY)
    }

    setSize()
    setLines()
    frameIdRef.current = requestAnimationFrame(tick)
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`waves ${className}`.trim()}
      style={{
        position: 'absolute',
        inset: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor,
        ...style,
      }}
    >
      <canvas ref={canvasRef} className="waves-canvas" />
    </div>
  )
}
