import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import './EnergyMesh.css'

export default function EnergyMesh() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    // Resize canvas to fill container
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const particleCount = 50
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width / dpr,
        y: Math.random() * canvas.height / dpr,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2
      })
    }

    particlesRef.current = particles

    // GSAP wave animation for particles
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: `+=${Math.random() * 30 - 15}`,
        x: `+=${Math.random() * 30 - 15}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.05
      })
    })

    // Animate canvas
    const animate = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      // Clear with fade effect for trail
      ctx.fillStyle = 'rgba(247, 241, 234, 0.1)'
      ctx.fillRect(0, 0, w, h)

      // Draw connections (curved lines)
      ctx.strokeStyle = 'rgba(31, 61, 243, 0.15)'
      ctx.lineWidth = 1

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3
            ctx.strokeStyle = `rgba(31, 61, 243, ${opacity})`
            
            // Curved line with bezier
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            const cpX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 20
            const cpY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 20
            ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      // Draw particles
      particles.forEach(particle => {
        // Pulsing effect
        particle.pulsePhase += 0.02
        const pulse = Math.sin(particle.pulsePhase) * 0.5 + 0.5
        const currentRadius = particle.radius * (1 + pulse * 0.3)

        // Gradient glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentRadius * 3
        )
        gradient.addColorStop(0, `rgba(31, 61, 243, ${particle.opacity * (pulse + 0.5)})`)
        gradient.addColorStop(0.5, `rgba(31, 61, 243, ${particle.opacity * 0.3})`)
        gradient.addColorStop(1, 'rgba(31, 61, 243, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentRadius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `rgba(31, 61, 243, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()

        // Update position with bounds check
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > w) particle.vx *= -1
        if (particle.y < 0 || particle.y > h) particle.vy *= -1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      gsap.killTweensOf(particles)
    }
  }, [])

  return (
    <div className="energy-mesh">
      <canvas ref={canvasRef} className="energy-mesh__canvas" />
      <div className="energy-mesh__gradient" />
    </div>
  )
}
