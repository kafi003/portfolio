import { motion } from 'framer-motion'
import './Contact.css'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

export default function Contact() {
  return (
    <section id="contact" data-section="contact" className="contact-section">
      <motion.div 
        className="contact-card"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: appleEase }}
      >
        <motion.h2 
          className="contact-heading"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: appleEase }}
        >
          Let's build something impactful together.
        </motion.h2>

        <motion.p 
          className="contact-availability"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7, ease: appleEase }}
          style={{ 
            textAlign: 'center', 
            fontSize: '1.05rem', 
            color: 'rgba(0, 0, 0, 0.7)', 
            marginTop: '1rem',
            marginBottom: '1.5rem',
            fontWeight: 500
          }}
        >
          📍 Arlington, TX — Open to relocation<br/>
          🎯 Open to internships, part-time, and full-time roles year-round
        </motion.p>

        <motion.p 
          className="contact-lede"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7, ease: appleEase }}
        >
          Backend engineer focused on distributed systems, scalable infrastructures, and event-driven architectures.
        </motion.p>

        <motion.p 
          className="contact-beyond-work"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6, ease: appleEase }}
          style={{ 
            textAlign: 'center', 
            marginTop: '2.5rem', 
            paddingTop: '2rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            color: 'rgba(0, 0, 0, 0.5)',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            lineHeight: '1.6'
          }}
        >
          <strong style={{ display: 'block', fontStyle: 'normal', fontWeight: 600, color: 'rgba(0, 0, 0, 0.7)', marginBottom: '0.5rem' }}>Beyond Work</strong>
          Traveler, mountain explorer, long-drive lover, cricket enthusiast, and hobby photographer with a passion for capturing landscapes.
        </motion.p>
      </motion.div>
    </section>
  )
}
