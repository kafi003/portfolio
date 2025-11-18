import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../data/projects'
import './ProjectsNew.css'

// Apple-style easing
const appleEase = [0.25, 0.1, 0.25, 1]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section id="projects-detail" data-section="projects-detail" className="projects-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: appleEase }}
      >
        <h2 className="section-heading">Featured Projects</h2>
        <p className="section-sub">Building production-ready systems with modern architecture patterns</p>
      </motion.div>

      <div className="project-cards">
        {projects.map((project, idx) => (
          <motion.article 
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ 
              duration: 0.7, 
              delay: idx * 0.12,
              ease: appleEase 
            }}
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              transition: { duration: 0.4, ease: appleEase }
            }}
            onHoverStart={() => setHoveredCard(project.id)}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => setSelectedProject(project)}
          >
            {/* Color accent bar */}
            <motion.div 
              className="project-card__accent" 
              style={{ background: project.color }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 + 0.3, duration: 0.6, ease: appleEase }}
            />
            
            {/* Hero Image */}
            {project.heroImage && (
              <motion.div 
                className="project-card__hero"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: appleEase }}
              >
                <motion.img 
                  src={project.heroImage} 
                  alt={`${project.name} preview`} 
                  loading="lazy"
                  animate={{ 
                    scale: hoveredCard === project.id ? 1.05 : 1 
                  }}
                  transition={{ duration: 0.5, ease: appleEase }}
                />
              </motion.div>
            )}
            
            {/* Header */}
            <div className="project-card__header">
              <div>
                <h3 className="project-card__title">{project.name}</h3>
                <p className="project-card__tagline">{project.tagline}</p>
              </div>
              <span className="project-card__company">{project.company}</span>
            </div>

            {/* Quick metrics */}
            <div className="project-card__metrics">
              {project.metrics?.slice(0, 2).map((metric, i) => (
                <motion.div 
                  key={i} 
                  className="metric-chip"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 + 0.4 + i * 0.1, duration: 0.5, ease: appleEase }}
                >
                  <span className="metric-chip__value">{metric.value}</span>
                  <span className="metric-chip__label">{metric.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="project-card__tech">
              {project.techStack.slice(0, 4).map((tech, i) => (
                <motion.span 
                  key={i} 
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 + 0.5 + i * 0.05, duration: 0.4, ease: appleEase }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 4 && (
                <motion.span 
                  className="tech-tag tech-tag--more"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 + 0.7, duration: 0.4, ease: appleEase }}
                >
                  +{project.techStack.length - 4}
                </motion.span>
              )}
            </div>

            {/* CTA */}
            <motion.button 
              className="project-card__cta"
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: appleEase }}
            >
              <span>View Case Study</span>
              <motion.svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                animate={{ x: hoveredCard === project.id ? 4 : 0 }}
                transition={{ duration: 0.3, ease: appleEase }}
              >
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </motion.button>
          </motion.article>
        ))}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="project-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                className="project-modal__close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Content */}
              <div className="project-modal__content">
                {/* Hero Image in Modal */}
                {selectedProject.heroImage && (
                  <div className="project-modal__hero">
                    <img src={selectedProject.heroImage} alt={`${selectedProject.name} preview`} />
                  </div>
                )}
                
                {/* Header */}
                <div className="project-modal__header">
                  <div>
                    <h2 className="project-modal__title">{selectedProject.name}</h2>
                    <p className="project-modal__tagline">{selectedProject.tagline}</p>
                  </div>
                  <div className="project-modal__meta">
                    <span className="project-modal__company">{selectedProject.company}</span>
                    <span className="project-modal__role">{selectedProject.role}</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="project-modal__metrics-grid">
                  {selectedProject.metrics?.map((metric, i) => (
                    <div key={i} className="modal-metric">
                      <span className="modal-metric__value">{metric.value}</span>
                      <span className="modal-metric__label">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                {selectedProject.stats && (
                  <div className="project-modal__stats">
                    {selectedProject.stats.map((stat, i) => (
                      <div key={i} className="stat-item">
                        <span className="stat-item__icon">→</span>
                        <span>{stat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                <div className="project-modal__section">
                  <h3 className="project-modal__section-title">Engineering Highlights</h3>
                  <ul className="project-modal__highlights">
                    {selectedProject.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="project-modal__section">
                  <h3 className="project-modal__section-title">Technology Stack</h3>
                  <div className="project-modal__tech-grid">
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} className="modal-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="project-modal__links">
                  {selectedProject.links.code && (
                    <a 
                      href={selectedProject.links.code} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-link modal-link--primary"
                    >
                      View Repository
                    </a>
                  )}
                  {selectedProject.links.demo && (
                    <a 
                      href={selectedProject.links.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
