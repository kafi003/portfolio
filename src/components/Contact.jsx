import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" data-section="contact" className="contact-section">
      <div className="contact-card">
        <span className="contact-badge">Availability · Summer 2025 internships · New Grad 2026</span>
        <h2 className="contact-heading">Let’s build resilient platforms together.</h2>
        <p className="contact-lede">
          Backend, distributed systems, or infrastructure teams looking for someone who obsesses over performance, reliability, and clean handoffs.
        </p>

        <ul className="contact-meta">
          <li>Ready for interviews immediately · Able to start May 2025</li>
          <li>Excited about fintech, infra-heavy startups, and systems-focused orgs</li>
        </ul>

        <div className="contact-actions">
          <a className="contact-button contact-button--primary" href="mailto:ramish.kafi@gmail.com">
            ramish.kafi@gmail.com
          </a>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/kafi003" target="_blank" rel="noopener">
              LinkedIn
            </a>
            <span>·</span>
            <a href="https://github.com/kafi003" target="_blank" rel="noopener">
              GitHub
            </a>
            <span>·</span>
            <a href="/Ramish_Anan_Kafi_Resume.pdf" target="_blank" rel="noopener">
              Résumé
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
