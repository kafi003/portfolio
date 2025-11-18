import { useEffect, useState } from 'react'
import './DeviceScene.css'

// Project showcase data
const projects = [
  {
    name: 'Fintrion',
    tagline: 'Distributed Payment Mesh',
    color: '#58a6ff',
    stats: ['100K+ Events/sec', '99.9% Uptime', 'Sub-200ms Latency'],
  },
  {
    name: 'Axenyx',
    tagline: 'AI Marketplace Platform',
    color: '#7aa7ff',
    stats: ['100K+ DAU', '$100K+ GMV', '50K+ Messages/day'],
  },
  {
    name: 'LeafX',
    tagline: 'AI Disease Detection',
    color: '#4ade80',
    stats: ['95% Accuracy', 'GPU Batching', '<250ms Response'],
  },
  {
    name: 'BSO UTA',
    tagline: 'Community Platform',
    color: '#f59e0b',
    stats: ['5K+ Members', '$50K+ Processed', '40% Ticket Reduction'],
  },
]


export default function DeviceScene() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentProject = projects[currentProjectIndex]

  // Auto-cycle through projects every 4 seconds with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
        setIsTransitioning(false)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="device-showcase-section" id="devices">
      <div className="container">
        <div className="section-header">
          <h2>Live Project Showcase</h2>
          <p className="section-subtitle">
            Real-time dashboards displaying <span style={{ color: currentProject.color, fontWeight: 'bold' }}>{currentProject.name}</span>
          </p>
        </div>

        <div className="devices-container">
          {/* MacBook Pro */}
          <div className="device-wrapper macbook-wrapper">
            <div className="macbook">
              {/* MacBook Screen */}
              <div className="macbook-screen">
                {/* Screen Content - Dashboard */}
                <div 
                  className={`dashboard-content ${isTransitioning ? 'transitioning' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${currentProject.color}15 0%, ${currentProject.color}05 100%)`
                  }}
                >
                  {/* Dashboard Header */}
                  <div className="dashboard-header">
                    <div className="project-logo" style={{ background: currentProject.color }}>
                      {currentProject.name[0]}
                    </div>
                    <div className="project-info">
                      <h3>{currentProject.name}</h3>
                      <p>{currentProject.tagline}</p>
                    </div>
                    <div className="status-badge">
                      <span className="status-dot"></span>
                      LIVE
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="stats-grid">
                    {currentProject.stats.map((stat, idx) => (
                      <div key={idx} className="stat-card" style={{
                        borderColor: `${currentProject.color}40`
                      }}>
                        <div className="stat-value" style={{ color: currentProject.color }}>
                          {stat.split(' ')[0]}
                        </div>
                        <div className="stat-label">
                          {stat.split(' ').slice(1).join(' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Activity Chart */}
                  <div className="activity-chart">
                    <div className="chart-header">
                      <h4>Real-time Activity</h4>
                      <span className="chart-period">Last 24 hours</span>
                    </div>
                    <div className="chart-bars">
                      {[...Array(12)].map((_, idx) => (
                        <div 
                          key={idx} 
                          className="chart-bar"
                          style={{
                            height: `${30 + Math.random() * 65}%`,
                            background: `linear-gradient(to top, ${currentProject.color}, ${currentProject.color}80)`,
                            animationDelay: `${idx * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                    <div className="dashboard-actions">
                      <button
                        type="button"
                        className="dashboard-action-button"
                        style={{
                          background: `linear-gradient(135deg, ${currentProject.color} 0%, ${currentProject.color}cc 100%)`,
                          boxShadow: `0 18px 36px ${currentProject.color}25`
                        }}
                      >
                        Enable GPT-5 for all clients
                      </button>
                      <span className="dashboard-action-hint">Instant failover · Zero-downtime rollout</span>
                    </div>
                </div>

                {/* Notch */}
                <div className="notch"></div>
              </div>

              {/* MacBook Base */}
              <div className="macbook-base">
                <div className="keyboard"></div>
                <div className="trackpad"></div>
              </div>
            </div>
          </div>

          {/* iPhone Pro */}
          <div className="device-wrapper iphone-wrapper">
            <div className="iphone">
              {/* iPhone Frame */}
              <div className="iphone-frame">
                {/* Screen Content - Mobile Dashboard */}
                <div className="iphone-screen">
                  <div className="mobile-dashboard" style={{
                    background: `linear-gradient(135deg, ${currentProject.color}10 0%, ${currentProject.color}05 100%)`
                  }}>
                    {/* Status Bar */}
                    <div className="status-bar">
                      <span>9:41</span>
                      <div className="status-icons">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* Mobile App Header */}
                    <div className="mobile-header" style={{ background: `${currentProject.color}20` }}>
                      <div className="mobile-logo" style={{ background: currentProject.color }}>
                        {currentProject.name[0]}
                      </div>
                      <h4>{currentProject.name}</h4>
                    </div>

                    {/* Mobile Stats */}
                    <div className="mobile-stats">
                      {currentProject.stats.map((stat, idx) => (
                        <div key={idx} className="mobile-stat-card" style={{
                          borderColor: `${currentProject.color}30`
                        }}>
                          <span className="mobile-stat-value" style={{ color: currentProject.color }}>
                            {stat.split(' ')[0]}
                          </span>
                          <span className="mobile-stat-label">
                            {stat.split(' ').slice(1).join(' ')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Chart */}
                    <div className="mobile-chart">
                      <div className="mobile-chart-bars">
                        {[...Array(8)].map((_, idx) => (
                          <div 
                            key={idx} 
                            className="mobile-chart-bar"
                            style={{
                              height: `${40 + Math.random() * 60}%`,
                              background: currentProject.color,
                              animationDelay: `${idx * 0.15}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                      <button
                        type="button"
                        className="mobile-action-button"
                        style={{
                          background: `linear-gradient(135deg, ${currentProject.color} 0%, ${currentProject.color}d4 100%)`,
                          boxShadow: `0 12px 28px ${currentProject.color}24`
                        }}
                      >
                        Enable GPT-5 for all clients
                      </button>

                    {/* Bottom Nav */}
                    <div className="mobile-nav">
                      {['📊', '⚙️', '📈', '👤'].map((icon, idx) => (
                        <div 
                          key={idx} 
                          className={`nav-icon ${idx === 0 ? 'active' : ''}`}
                          style={{ color: idx === 0 ? currentProject.color : undefined }}
                        >
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic Island */}
                <div className="dynamic-island"></div>

                {/* Camera Module */}
                <div className="camera-module">
                  <div className="camera-lens main-camera"></div>
                  <div className="camera-lens ultra-wide"></div>
                  <div className="camera-lens telephoto"></div>
                  <div className="lidar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-hint">
          <p>💻 MacBook Pro M5 • 📱 iPhone 17 Pro Max • Auto-cycling projects every 4 seconds</p>
        </div>
      </div>
    </section>
  )
}
