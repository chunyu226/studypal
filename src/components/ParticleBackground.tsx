import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
}

interface ParticleBackgroundProps {
  theme: 'light' | 'dark'
}

const CONNECTION_DISTANCE = 150
const DESKTOP_PARTICLE_COUNT = 65
const MOBILE_PARTICLE_COUNT = 35
const MOBILE_BREAKPOINT = 768

function generateParticles(width: number, height: number): Particle[] {
  const isMobile = width < MOBILE_BREAKPOINT
  const count = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT

  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1.5 + Math.random() * 1.5,
  }))
}

const ParticleBackground = ({ theme }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const resizeTimerRef = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = theme === 'dark'
    const particleColor = isDark ? '#4fc3f7' : '#4f46e5'
    const lineAlpha = isDark ? 0.15 : 0.25

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    const connDist = CONNECTION_DISTANCE

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j]
        const dx = p.x - q.x
        const dy = p.y - q.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < connDist) {
          const alpha = (1 - dist / connDist) * lineAlpha
          ctx.strokeStyle = isDark
            ? `rgba(79, 195, 247, ${alpha})`
            : `rgba(79, 70, 229, ${alpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.stroke()
        }
      }

      // Draw particle
      ctx.fillStyle = particleColor
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [theme])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateCanvasSize = () => {
      const canvas = canvasRef.current
      if (!canvas || !container) return

      const { width, height } = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)

      particlesRef.current = generateParticles(width, height)
      draw()
    }

    updateCanvasSize()

    const handleResize = () => {
      clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = setTimeout(updateCanvasSize, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimerRef.current)
    }
  }, [draw])

  // Redraw on theme change
  useEffect(() => {
    draw()
  }, [draw])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block" aria-hidden="true" />
    </div>
  )
}

export default ParticleBackground
