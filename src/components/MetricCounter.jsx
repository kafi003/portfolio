import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import './MetricCounter.css'

gsap.registerPlugin(ScrollTrigger)

export default function MetricCounter({ value, label, suffix = '', prefix = '' }) {
  const counterRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return

    const numericValue = typeof value === 'string' ? 
      parseInt(value.replace(/\D/g, '')) : value

    if (isNaN(numericValue)) {
      counterRef.current.textContent = value
      return
    }

    const counter = { val: 0 }
    
    ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        gsap.to(counter, {
          val: numericValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = 
                prefix + Math.ceil(counter.val).toLocaleString() + suffix
            }
          }
        })
      },
      once: true
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === counterRef.current) {
          trigger.kill()
        }
      })
    }
  }, [value, suffix, prefix])

  return (
    <div className="metric-counter">
      <div ref={counterRef} className="metric-counter__value">
        {prefix}0{suffix}
      </div>
      <div className="metric-counter__label">{label}</div>
    </div>
  )
}
