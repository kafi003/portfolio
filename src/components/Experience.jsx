import { motion } from 'framer-motion'
import { experiences } from '../data/experiences'
import './Experience.css'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

export default function Experience() {
  return (
    <section id="experience" data-section="experience" className="experience-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: appleEase }}
      >
        <h2 className="section-heading">Professional Experience</h2>
        <p className="section-sub">Full-time & contract roles building production systems.</p>
      </motion.div>

      <div className="experience-timeline">
        {experiences.map((exp, idx) => (
          <motion.div 
            className="experience-card" 
            key={idx}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ 
              duration: 0.7, 
              delay: idx * 0.15,
              ease: appleEase 
            }}
            whileHover={{ 
              x: 8, 
              scale: 1.01,
              transition: { duration: 0.4, ease: appleEase }
            }}
          >
            <div className="experience-header">
              <div>
                <motion.h3 
                  className="experience-title"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.2, duration: 0.5, ease: appleEase }}
                >
                  {exp.role}
                </motion.h3>
                <motion.p 
                  className="experience-company"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3, duration: 0.5, ease: appleEase }}
                >
                  {exp.company} • {exp.location}
                </motion.p>
                <motion.p 
                  className="experience-type"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.4, duration: 0.5, ease: appleEase }}
                >
                  {exp.type}
                </motion.p>
              </div>
              <motion.span 
                className="experience-period"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 + 0.2, duration: 0.5, ease: appleEase }}
              >
                {exp.period}
              </motion.span>
            </div>
            <ul className="experience-highlights">
              {exp.highlights.map((highlight, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: idx * 0.15 + 0.4 + i * 0.08, 
                    duration: 0.5, 
                    ease: appleEase 
                  }}
                >
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
