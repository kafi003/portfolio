import { useState } from 'react';
import './FeaturedProjects.css';

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: 'Fintrion',
    tagline: 'Financial Trading Simulation Platform',
    description: 'Real-time stock trading simulator with portfolio management, market analytics, and social trading features.',
    tech: ['Next.js', 'Firebase', 'Chart.js', 'WebSocket'],
    highlights: ['Double-Entry Accounting', 'Real-time Price Feed', 'Firebase Auth'],
    status: 'Production',
    links: {
      live: null,
      github: 'https://github.com/kafi003/Fintrion.git'
    }
  },
  {
    id: 2,
    title: 'Event Streaming Platform',
    tagline: 'Kafka-Like Message Broker',
    description: 'Kafka-like distributed message broker with partition replication, consumer groups, and durable log storage.',
    tech: ['Node.js', 'PostgreSQL', 'Docker', 'WebSockets'],
    highlights: ['256 Partitions', 'At-least-once Delivery', 'Consumer Groups'],
    status: 'In Progress',
    links: {
      live: null,
      github: null
    }
  },
  {
    id: 3,
    title: 'Distributed Rate Limiter',
    tagline: 'Global API Protection Service',
    description: 'Global, high-performance API protection service implementing sliding window algorithm & multi-region synchronization.',
    tech: ['Node.js', 'Redis', 'Docker', 'Express'],
    highlights: ['Sliding Window', 'Global Sync', 'Sub-ms Latency'],
    status: 'In Progress',
    links: {
      live: null,
      github: null
    }
  },
  {
    id: 4,
    title: 'Axenyx',
    tagline: 'Vehicle Marketplace Platform',
    description: 'Full-stack marketplace with secure payments, advanced search, and real-time notifications.',
    tech: ['Next.js 14', 'Prisma', 'PostgreSQL', 'Stripe'],
    highlights: ['Stripe Integration', 'Advanced Filters', 'Image Upload'],
    status: 'Production',
    links: {
      live: null,
      github: 'https://github.com/kafi003/Axenyx.git'
    }
  },
  {
    id: 5,
    title: 'BSO UTA',
    tagline: 'Campus Community Platform',
    description: 'Campus engagement platform with role-based access control and comprehensive event management.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    highlights: ['3-Role RBAC', '12+ Models', 'Event Management'],
    status: 'Production',
    links: {
      live: null,
      github: 'https://github.com/kafi003/BSOuta/tree/94ba94f7a9fae71c489ebb0d2f6f79aa123a31fe/BSO'
    }
  },
  {
    id: 6,
    title: 'LeafX',
    tagline: 'AI Environmental Sustainability Platform',
    description: 'AI-powered platform for environmental impact tracking with voice interaction and recommendations.',
    tech: ['React', 'Gemini AI', 'Firebase', 'ElevenLabs'],
    highlights: ['Gemini AI', 'ElevenLabs Voice', 'Impact Analytics'],
    status: 'Production',
    links: {
      live: 'https://kafi003.github.io/LeafX/#/',
      github: 'https://github.com/kafi003/LeafX.git'
    }
  },
  {
    id: 7,
    title: 'EmergencyAI Doctor',
    tagline: 'AI-Powered Medical Diagnosis',
    description: 'Emergency medical diagnosis assistant using advanced language models for symptom analysis.',
    tech: ['Python', 'LLM', 'FastAPI', 'React'],
    highlights: ['LLM Integration', 'Symptom Analysis', 'Emergency Care'],
    status: 'In Progress',
    links: {
      live: null,
      github: null
    }
  }
];

const FeaturedProjects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section className="featured-projects" id="projects">
      <div className="featured-projects__container">
        {/* Section Header */}
        <div className="featured-projects__header">
          <div className="featured-projects__badge">
            <span>Featured Work</span>
          </div>
          <h2 className="featured-projects__title">
            Production-Ready Projects
          </h2>
          <p className="featured-projects__subtitle">
            Built multiple production-grade distributed and full-stack systems showcasing event-driven architectures, scalable databases, and modern web technologies
          </p>
        </div>

        {/* Projects Grid */}
        <div className="featured-projects__grid">
          {FEATURED_PROJECTS.map((project) => (
            <article
              key={project.id}
              className={`project-card ${hoveredProject === project.id ? 'project-card--hovered' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Status Badge */}
              <div className="project-card__status">
                <span className={`status-badge status-badge--${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status === 'Production' && '✓'}
                  {project.status === 'In Progress' && '⏳'}
                  {' '}
                  {project.status}
                </span>
              </div>

              {/* Project Info */}
              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__tagline">{project.tagline}</p>
                <p className="project-card__description">{project.description}</p>

                {/* Highlights */}
                <div className="project-card__highlights">
                  {project.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-tag">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="project-card__tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="project-card__links">
                {project.links.live && (
                  <a href={project.links.live} className="project-link project-link--primary">
                    <span>View Live</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
                {project.links.github && (
                  <a href={project.links.github} className="project-link project-link--secondary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>Code</span>
                  </a>
                )}
              </div>

              {/* Hover Effect Gradient */}
              <div className="project-card__gradient"></div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="featured-projects__footer">
          <p className="footer-text">Interested in more details?</p>
          <a href="#contact" className="footer-cta">
            Let's discuss these projects
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
