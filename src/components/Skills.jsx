import { motion } from 'framer-motion'
import { skillCategories } from '../data/skills'
import './Skills.css'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

export default function Skills() {
  return (
    <section id="skills" data-section="skills" className="skills-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: appleEase }}
      >
        <h2 className="section-heading">Technical Skills</h2>
        <p className="section-sub">Core stack for building scalable systems.</p>
      </motion.div>

      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <motion.div 
            className="skill-category" 
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ 
              duration: 0.7, 
              delay: idx * 0.12,
              ease: appleEase 
            }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { duration: 0.4, ease: appleEase }
            }}
          >
            <motion.h3 
              className="skill-category-title"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: idx * 0.12 + 0.2, 
                duration: 0.5, 
                ease: appleEase 
              }}
            >
              {category.title}
            </motion.h3>
            <div className="skill-tags">
              {category.items.map((skill, i) => (
                <motion.span 
                  className="skill-tag" 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: idx * 0.12 + 0.3 + i * 0.04, 
                    duration: 0.5, 
                    ease: appleEase 
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -4,
                    transition: { duration: 0.3, ease: appleEase }
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
