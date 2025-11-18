import { motion } from 'framer-motion'
import './Education.css'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

export default function Education() {
  return (
    <section id="education" data-section="education" className="education-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: appleEase }}
      >
        <h2 className="section-heading">Education & Skills</h2>
        <p className="section-sub">Relevant coursework and skills practiced in academic and personal projects.</p>
      </motion.div>

      <motion.div 
        className="education-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: appleEase }}
        whileHover={{ 
          y: -6, 
          scale: 1.01,
          transition: { duration: 0.4, ease: appleEase }
        }}
      >
        <div className="education-header">
          <div className="education-main">
            <motion.h3 
              className="education-degree"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: appleEase }}
            >
              Bachelor of Science in Computer Science
            </motion.h3>
            <motion.p 
              className="education-school"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: appleEase }}
            >
              University of Texas at Arlington
            </motion.p>
          </div>
          <div className="education-details">
            <motion.span 
              className="education-date"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, ease: appleEase }}
            >
              Expected: May 2027
            </motion.span>
          </div>
        </div>

        <div className="education-coursework">
          <motion.h4
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5, ease: appleEase }}
          >
            Relevant Coursework & Skills Practiced
          </motion.h4>
          <div className="coursework-grid">
            {[
              'Distributed Systems',
              'Data Structures & Algorithms',
              'Database Systems',
              'Operating Systems',
              'Software Engineering',
              'Computer Networks',
              'Cloud Computing',
              'Machine Learning'
            ].map((course, idx) => (
              <motion.span 
                key={course}
                className="course-badge"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.06, duration: 0.5, ease: appleEase }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -3,
                  transition: { duration: 0.3, ease: appleEase }
                }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="education-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: appleEase }}
        whileHover={{ 
          y: -6, 
          scale: 1.01,
          transition: { duration: 0.4, ease: appleEase }
        }}
      >
        <div className="education-header">
          <div className="education-main">
            <h3 className="education-degree">Higher Secondary Certificate (Science)</h3>
            <p className="education-school">Shaheed Buddhijibi Government College, Rajshahi</p>
          </div>
          <div className="education-details">
            <span className="education-date">Jul 2019 – Dec 2021</span>
            <span className="education-gpa">GPA: 5.00/5.00</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="education-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="education-header">
          <div className="education-main">
            <h3 className="education-degree">Secondary School Certificate (Science)</h3>
            <p className="education-school">Harimohan Government High School, Rajshahi</p>
          </div>
          <div className="education-details">
            <span className="education-date">Jan 2013 – Mar 2019</span>
            <span className="education-gpa">GPA: 5.00/5.00</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
