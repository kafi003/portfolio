import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

export default function AppleScrollEffects() {
  useEffect(() => {
    // Apple-style section fade-in from bottom
    gsap.utils.toArray('section').forEach((section) => {
      gsap.from(section, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
          once: false
        }
      })
    })

    // Apple "Floating up" effect for section headings
    gsap.utils.toArray('.section-heading').forEach((heading) => {
      gsap.from(heading, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 90%',
          end: 'top 70%',
          scrub: 1.5,
        }
      })
    })

    // Apple "Slide from left" for cards
    gsap.utils.toArray('.project-card, .experience-card, .education-card').forEach((card, index) => {
      gsap.from(card, {
        x: -80,
        opacity: 0,
        duration: 1,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 65%',
          scrub: 1.5,
        }
      })
    })

    // Apple "Counter animation" for metrics
    gsap.utils.toArray('.hero__stat-value, .metric-chip__value').forEach((stat) => {
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
          gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
          })
        },
        once: true
      })
    })

    // Apple "Parallax layers" - different speeds
    gsap.utils.toArray('.hero__container, .contact-card').forEach((element) => {
      gsap.to(element, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      })
    })

    // Apple "Background color transition"
    const sections = gsap.utils.toArray('section')
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: i % 2 === 0 ? '#f7f1ea' : '#faf7f2',
            duration: 0.8,
            ease: 'power2.inOut'
          })
        },
        onEnterBack: () => {
          gsap.to('body', {
            backgroundColor: i % 2 === 0 ? '#f7f1ea' : '#faf7f2',
            duration: 0.8,
            ease: 'power2.inOut'
          })
        }
      })
    })

    // Apple "Split screen" effect for projects
    gsap.utils.toArray('.project-card__hero img').forEach((img) => {
      gsap.from(img, {
        scale: 1.2,
        opacity: 0.5,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        }
      })
    })

    // Apple "Icon fade in" for skill tags
    gsap.utils.toArray('.skill-tag, .tech-tag, .course-badge').forEach((tag, index) => {
      gsap.from(tag, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.03,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: tag,
          start: 'top 90%',
          once: true
        }
      })
    })

    // Apple "Smooth scroll" pin effect
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: '+=500',
      pin: false,
      scrub: 1,
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return null // This component only handles side effects
}
