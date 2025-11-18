import { useCallback, useEffect, useMemo, useState } from 'react'
import { projects as defaultProjects } from '../data/projects'
import './DeviceScene.css'

function normalizeIndex(index, length) {
  if (length === 0) return 0
  const normalized = index % length
  return normalized < 0 ? normalized + length : normalized
}

export default function DeviceScene({
  projects = defaultProjects,
  activeIndex,
  onActiveIndexChange,
  layout = 'section',
}) {
  const isControlled = typeof activeIndex === 'number' && typeof onActiveIndexChange === 'function'
  const [internalIndex, setInternalIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentIndex = isControlled ? normalizeIndex(activeIndex, projects.length) : internalIndex
  const currentProject = useMemo(() => projects[currentIndex] ?? projects[0], [projects, currentIndex])
  const metrics = currentProject?.metrics ?? []
  const statList = currentProject?.stats ?? []
  const techStack = currentProject?.techStack ?? []
  const summaryText = currentProject?.summary ?? ''
  const mobileSummary = summaryText.length > 120 ? `${summaryText.slice(0, 117)}…` : summaryText

  const setProjectIndex = useCallback(
    (next) => {
      const current = isControlled ? currentIndex : internalIndex
      const value = typeof next === 'function' ? next(current) : next
      const normalized = normalizeIndex(value, projects.length)

      if (isControlled) {
        onActiveIndexChange?.(normalized)
      } else {
        setInternalIndex(normalized)
      }
    },
    [isControlled, currentIndex, internalIndex, projects.length, onActiveIndexChange],
  )

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 320)
    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    if (isControlled) return

    const interval = setInterval(() => {
      setProjectIndex((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [isControlled, setProjectIndex])

  const RootTag = layout === 'section' ? 'section' : 'div'
  const rootProps = layout === 'section' ? { id: 'devices' } : {}
  const isStandalone = layout === 'section'

  return (
    <RootTag className={`device-showcase-section${isStandalone ? '' : ' device-showcase-section--embedded'}`} {...rootProps}>
      <div className="container">
        {isStandalone && (
          <div className="section-header">
            <span className="section-kicker">Case Orbit Device Mirror</span>
            <h2>Live case visuals in lockstep with the orbit.</h2>
            <p className="section-subtitle">
              Real-time MacBook and iPhone renders follow the active case study, keeping stakeholders inside the experience.
            </p>
          </div>
        )}

        <div className="devices-container">
          <div className="device-wrapper macbook-wrapper">
            <div className="macbook">
              <div className="macbook-screen">
                <div 
                  className={`dashboard-content ${isTransitioning ? 'transitioning' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${currentProject.color}15 0%, ${currentProject.color}05 100%)`
                  }}
                >
                  <div className="dashboard-header">
                    <div className="project-logo" style={{ background: currentProject.color }}>
                      {currentProject.name[0]}
                    </div>
                    <div className="project-info">
                      <span className="dashboard-kicker">Active case</span>
                      <h3>{currentProject.name}</h3>
                      <p>{currentProject.tagline}</p>
                    </div>
                    <div className="status-badge" style={{ background: `${currentProject.color}1f`, color: currentProject.color }}>
                      ● Live
                    </div>
                  </div>

                  <div className="dashboard-body">
                    {summaryText && (
                      <div className="dashboard-summary">
                        <span className="dashboard-summary__label">Mission Control</span>
                        <p>{summaryText}</p>
                      </div>
                    )}

                    {metrics.length > 0 && (
                      <div className="dashboard-metrics">
                        {metrics.map((metric) => (
                          <div key={metric.label} className="dashboard-metric">
                            <span className="dashboard-metric__value" style={{ color: currentProject.color }}>
                              {metric.value}
                            </span>
                            <span className="dashboard-metric__label">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {techStack.length > 0 && (
                      <div className="dashboard-tech">
                        {techStack.slice(0, 5).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="macbook-base">
                <div className="keyboard" />
                <div className="trackpad" />
              </div>
            </div>
          </div>

          <div className="device-wrapper iphone-wrapper">
            <div className="iphone">
              <div className="iphone-frame">
                <div className="iphone-screen">
                  <div className={`mobile-dashboard ${isTransitioning ? 'transitioning' : ''}`}>
                    <div className="status-bar">
                      <span>9:41</span>
                      <span>📶 🔋</span>
                    </div>
                    
                    <div className="mobile-header">
                      <div className="mobile-logo" style={{ background: currentProject.color }}>
                        {currentProject.name[0]}
                      </div>
                      <div>
                        <span className="mobile-kicker">Orbit synced</span>
                        <h4>{currentProject.name}</h4>
                        <p>{currentProject.tagline}</p>
                      </div>
                    </div>

                    {statList.length > 0 && (
                      <div className="mobile-pill-row">
                        {statList.slice(0, 3).map((stat) => (
                          <span key={stat} className="mobile-pill" style={{ borderColor: `${currentProject.color}40` }}>
                            {stat}
                          </span>
                        ))}
                      </div>
                    )}

                    {mobileSummary && (
                      <div className="mobile-summary">
                        {mobileSummary}
                      </div>
                    )}

                    {techStack.length > 0 && (
                      <div className="mobile-footer">
                        <span className="mobile-footer__label">Key stack</span>
                        <div className="mobile-tags">
                          {techStack.slice(0, 3).map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="camera-module">
                  <div className="camera-lens main-camera"></div>
                  <div className="camera-lens"></div>
                  <div className="camera-lens"></div>
                  <div className="lidar-scanner"></div>
                </div>

                <div className="dynamic-island">
                  <div className="camera"></div>
                  <div className="face-id"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootTag>
  )
}
