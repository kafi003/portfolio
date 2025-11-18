import { motion, useScroll, useTransform } from 'framer-motion'
import './HeroFuturistic.css'

const KEY_HIGHLIGHTS = [
  { label: 'UTA CS', value: "Expected May '27", subtext: 'Bachelor of Science' },
  { label: 'Open to Work', value: 'Year-Round', subtext: 'Internships & Full-Time' },
  { label: 'Built multiple production-grade', value: 'distributed and full-stack systems', subtext: '' },
  { label: 'Full-Stack Experience', value: 'Backend Focus', subtext: 'Distributed Systems' },
]

const TECH_STACK = [
  'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'TypeScript', 'React', 'Docker', 'Redis', 'Kafka'
]

// Apple-style smooth easing curves
const appleEase = [0.25, 0.1, 0.25, 1]
const appleSpring = { type: "spring", stiffness: 100, damping: 20 }

export default function Hero() {
  const { scrollYProgress } = useScroll()
  
  // Apple-style parallax - subtle movement on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  
  return (
    <section id="home" data-section="home" className="hero">
  {/* Hero Section - Clean and Organized */}
      <motion.div 
        className="hero__container"
        style={{ y, opacity, scale }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: appleEase }}
      >
        {/* Status Badge - Futuristic */}
        <motion.div 
          className="hero__status-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: appleEase }}
        >
          <span className="status-pulse"></span>
          <span>Open to opportunities year-round</span>
        </motion.div>

        {/* Profile Photo */}
        <motion.div 
          className="hero__profile-photo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: appleEase }}
          whileHover={{ scale: 1.07 }}
        >
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',background:'linear-gradient(135deg,#1f3df3 0%,#c9a961 100%)',padding:'4px',boxShadow:'0 8px 32px rgba(31,61,243,0.13),0 2px 8px rgba(0,0,0,0.07)'}}>
            <img src="/profile.png" alt="Ramish Anan Kafi" loading="eager" style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover',boxShadow:'0 2px 16px rgba(31,61,243,0.10),0 1px 3px rgba(0,0,0,0.04)',background:'#fff',border:'2px solid #fff'}} />
          </div>
        </motion.div>

        {/* Main Identity */}
        <div className="hero__identity">
          <motion.div
            className="hero__name-block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 1, ease: appleEase }}
          >
            <h1 className="hero__name">Ramish Anan Kafi</h1>
            <div className="hero__title-wrapper">
              <span className="hero__title-badge">Backend Engineer</span>
              <span className="hero__title-separator">•</span>
              <span className="hero__title-specialty">Distributed Systems</span>
              <span className="hero__title-separator">•</span>
              <span className="hero__title-specialty">Full-Stack Experience</span>
            </div>
            {/* ...existing code... (removed duplicate contact/social links) */}
          </motion.div>

          <motion.p 
            className="hero__mission"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: appleEase }}
          >
            Building <strong>production-grade distributed systems</strong> with event-driven architectures. 
            Specialized in <strong>PostgreSQL</strong>, <strong>Prisma ORM</strong>, and <strong>Next.js</strong> full-stack development.
          </motion.p>

          <motion.div 
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: appleEase }}
          >
            <motion.a 
              className="hero__cta hero__cta--primary" 
              href="mailto:rakafi003@gmail.com"
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(31, 61, 243, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={appleSpring}
            >
              <span>Let's Connect</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a 
              className="hero__cta hero__cta--secondary" 
              href="/Ramish_Anan_Kafi_Resume.pdf" 
              target="_blank" 
              rel="noopener"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={appleSpring}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1v10M5 7l4 4 4-4M2 13v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Key Highlights Grid - Most Important Info */}
        <motion.div 
          className="hero__highlights-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {KEY_HIGHLIGHTS.map((item, idx) => (
            <motion.div 
              key={item.label} 
              className="hero__highlight-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.9 + idx * 0.1, 
                duration: 0.7, 
                ease: appleEase,
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 20px 60px rgba(31, 61, 243, 0.2)",
                transition: { duration: 0.3, ease: appleEase }
              }}
            >
              <div className="highlight-content">
                <span className="highlight-label">{item.label}</span>
                <span className="highlight-value">{item.value}</span>
                <span className="highlight-subtext">{item.subtext}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Pills - Futuristic Scroll */}
        <motion.div 
          className="hero__tech-stack"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="tech-stack-label">Tech Stack</span>
          <div className="tech-stack-pills">
            {TECH_STACK.map((tech, idx) => (
              <motion.span
                key={tech}
                className="tech-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.3 + idx * 0.05, 
                  duration: 0.5,
                  ease: appleEase 
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  backgroundColor: "rgba(31, 61, 243, 0.15)",
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

  {/* End of Hero Container */}
      </motion.div>
    </section>
  )
}
