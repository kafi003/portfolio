import { projects } from '../data/projects'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects-detail" data-section="projects-detail" className="projects-section">
      <h2 className="section-heading">Featured Engineering Projects</h2>
      <p className="section-sub">Select systems where I led architecture, scaling, or performance wins.</p>

      <div className="card-grid">
        {projects.map((project, idx) => (
          <article className="card" key={idx}>
            <div>
              <h3 className="card-title">{`${project.name} · ${project.tagline}`}</h3>
              <p className="card-company">{project.company}</p>
              <p className="card-role">{project.role}</p>
              <p className="card-meta">{project.description}</p>
            </div>
            <ul>
              {project.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
            <div className="badge-row">
              {project.techStack.map((tag, i) => (
                <span className="badge" key={i}>{tag}</span>
              ))}
            </div>
            <div className="card-links">
              {project.links.code && (
                <a href={project.links.code} target="_blank" rel="noopener">View Code</a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener">Live Demo</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
