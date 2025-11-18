import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import MetricCounter from './MetricCounter'
import './SplitShowcase.css'

gsap.registerPlugin(ScrollTrigger)

export default function SplitShowcase() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const shapeRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const shape = shapeRef.current

    if (!section || !text || !shape) return

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=100%',
      pin: true,
      anticipatePin: 1,
    })

    // Animate text from left
    gsap.from(text.querySelectorAll('.split-showcase__item'), {
      x: -80,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 30%',
        scrub: 1,
      }
    })

    // Animate shape with pulsing glow
    gsap.to(shape, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.from(shape, {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="split-showcase">
      <div className="split-showcase__container">
        {/* Left: Text Content */}
        <div ref={textRef} className="split-showcase__text">
          <h2 className="section-heading split-showcase__item">
            Technical Excellence
          </h2>
          <p className="split-showcase__description split-showcase__item">
            Building production-grade systems with modern architecture patterns
          </p>

          <div className="split-showcase__metrics">
            <div className="split-showcase__item">
              <MetricCounter value={7} label="Projects" suffix="+" />
            </div>
            <div className="split-showcase__item">
              <MetricCounter value={5} label="Experiences" />
            </div>
            <div className="split-showcase__item">
              <MetricCounter value={25} label="Technologies" suffix="+" />
            </div>
          </div>

          <div className="split-showcase__features split-showcase__item">
            <div className="split-showcase__feature">
              <div className="split-showcase__feature-icon">🏗️</div>
              <div>
                <h3>System Design</h3>
                <p>Scalable distributed architectures</p>
              </div>
            </div>
            <div className="split-showcase__feature">
              <div className="split-showcase__feature-icon">⚡</div>
              <div>
                <h3>Performance</h3>
                <p>Optimized for high throughput</p>
              </div>
            </div>
            <div className="split-showcase__feature">
              <div className="split-showcase__feature-icon">🔒</div>
              <div>
                <h3>Security</h3>
                <p>Built with best practices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Glowing Abstract Shape */}
        <div className="split-showcase__visual">
          <div ref={shapeRef} className="split-showcase__shape">
            <div className="split-showcase__shape-glow"></div>
            <svg viewBox="0 0 400 400" className="split-showcase__shape-svg">
              <defs>
                <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1f3df3" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1223b0" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Abstract geometric shape */}
              <path 
                d="M200,50 L300,150 L250,300 L150,300 L100,150 Z" 
                fill="url(#shapeGradient)" 
                filter="url(#glow)"
                opacity="0.9"
              />
              <circle cx="200" cy="150" r="80" fill="url(#shapeGradient)" opacity="0.5" filter="url(#glow)" />
              <circle cx="180" cy="250" r="60" fill="url(#shapeGradient)" opacity="0.4" filter="url(#glow)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
