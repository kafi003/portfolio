import './Hero.css'

const METRICS = [
  { value: '100K+', label: 'requests / sec managed across Kafka, Redis + gRPC mesh' },
  { value: '99.9%', label: 'uptime held during blue/green ship cycles and chaos drills' },
  { value: '40%', label: 'manual operations automated for UTA organizations' },
]

const IMPACT_LOG = [
  '2024·10 — Automated UTA student org ops → 40% less manual work',
  '2024·08 — Fintrion handled 100K+ concurrent streaming events',
  '2024·05 — LeafX ML pipeline sustained 95% detection accuracy',
]

const TAGS = ['Fintech', 'AI Ops', 'Realtime Platforms']

export default function Hero() {
  return (
    <section id="home" data-section="home" className="hero">
      <div className="hero__layout">
        <div className="hero__primary">
          <span className="hero__eyebrow">Ramish Anan Kafi · UTA CS ’26 · GPA 3.8</span>
          <h1>Systems engineer designing resilient backends for revenue-critical products.</h1>
          <p className="hero__lede">
            I specialise in distributed systems, scaling infrastructure, and reliability programs for fintech and AI platforms.
            My work keeps six-figure user bases online, performant, and compliant.
          </p>

          <div className="hero__actions">
            <a className="hero__button hero__button--primary" href="mailto:ramish.kafi@gmail.com">
              Start a conversation
            </a>
            <a className="hero__button" href="/Ramish_Anan_Kafi_Resume.pdf" target="_blank" rel="noopener">
              Download résumé
            </a>
          </div>

          <div className="hero__tags">
            {TAGS.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="hero__secondary">
          <div className="hero__profile-card">
            <img src="/profile.png" alt="Ramish Anan Kafi" loading="eager" />
            <div>
              <strong>Based in Arlington, TX</strong>
              <span>Open to relocation · Available immediately</span>
            </div>
          </div>

          <dl className="hero__metrics">
            {METRICS.map((metric) => (
              <div key={metric.value} className="hero__metric">
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>

          <div className="hero__log" aria-label="Recent impact log">
            <span className="hero__log-label">Impact log</span>
            <ul>
              {IMPACT_LOG.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
