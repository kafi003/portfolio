import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { projects as defaultProjects } from "../data/projects";
import "./RotatingProjectShowcase.css";

const AUTOPLAY_INTERVAL = 4500;
const ROTATION_STIFFNESS = 90;
const ROTATION_DAMPING = 16;

// More accurate ship wheel - 8 main spokes + 8 decorative handles
const MAIN_SPOKES = [
  { id: "north", angle: 0, label: "N" },
  { id: "northeast", angle: 45, label: "NE" },
  { id: "east", angle: 90, label: "E" },
  { id: "southeast", angle: 135, label: "SE" },
  { id: "south", angle: 180, label: "S" },
  { id: "southwest", angle: 225, label: "SW" },
  { id: "west", angle: 270, label: "W" },
  { id: "northwest", angle: 315, label: "NW" },
];

const DECORATIVE_HANDLES = [
  { angle: 22.5 },
  { angle: 67.5 },
  { angle: 112.5 },
  { angle: 157.5 },
  { angle: 202.5 },
  { angle: 247.5 },
  { angle: 292.5 },
  { angle: 337.5 },
];

function normalizeIndex(index, length) {
  if (length === 0) return 0;
  const normalized = index % length;
  return normalized < 0 ? normalized + length : normalized;
}

export default function RotatingProjectShowcase({
  projects = defaultProjects,
  activeIndex,
  onActiveChange,
}) {
  const itemCount = projects.length;
  const angleStep = itemCount > 0 ? 360 / itemCount : 0;
  const [internalIndex, setInternalIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rotationTarget = useMotionValue(0);
  const rotation = useSpring(rotationTarget, {
    stiffness: ROTATION_STIFFNESS,
    damping: ROTATION_DAMPING,
    mass: 0.9,
  });
  const reverseRotation = useTransform(rotation, (value) => -value);
  const [rotationValue, setRotationValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rotation.on("change", setRotationValue);
    return () => unsubscribe();
  }, [rotation]);

  const isControlled = typeof activeIndex === "number" && typeof onActiveChange === "function";
  const currentIndex = isControlled
    ? normalizeIndex(activeIndex, itemCount)
    : normalizeIndex(internalIndex, itemCount);

  const currentProject = useMemo(() => projects[currentIndex] ?? projects[0], [projects, currentIndex]);
  const orbitRadius = useMemo(() => {
    if (itemCount <= 4) return 118;
    if (itemCount <= 6) return 119;
    return 120;
  }, [itemCount]);

  const setActiveIndex = useCallback(
    (next) => {
      const current = isControlled ? currentIndex : internalIndex;
      const target = typeof next === "function" ? next(current) : next;
      const normalized = normalizeIndex(target, itemCount);

      if (isControlled) {
        onActiveChange?.(normalized);
      } else {
        setInternalIndex(normalized);
      }
    },
    [isControlled, currentIndex, internalIndex, itemCount, onActiveChange],
  );

  useEffect(() => {
    rotationTarget.set(-currentIndex * angleStep);
  }, [currentIndex, angleStep, rotationTarget]);

  useEffect(() => {
    if (itemCount === 0 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [itemCount, isPaused, setActiveIndex]);

  const handleHover = useCallback((state) => setIsPaused(state), []);

  if (itemCount === 0 || !currentProject) {
    return null;
  }

  return (
    <div className="wheel-section" onPointerEnter={() => handleHover(true)} onPointerLeave={() => handleHover(false)}>
      <header className="wheel-header">
        <div className="wheel-kicker">Project Navigator</div>
        <h2>Ship's Wheel</h2>
        <p>Navigate through flagship projects—each spoke represents a major build in the voyage.</p>
      </header>

      <div className="wheel-layout">
        <div className="wheel-viewport">
          {/* Enhanced Ship wheel hub with outer rim */}
          <div className="ship-wheel-outer-rim" />
          
          <div className="ship-wheel-hub">
            <div className="hub-inner">
              <div className="hub-center-dot" />
              <div className="compass-rose">
                <div className="compass-needle north" />
                <div className="compass-needle south" />
                <div className="compass-needle east" />
                <div className="compass-needle west" />
              </div>
              <div className="hub-rings">
                <div className="hub-ring" />
                <div className="hub-ring" />
              </div>
            </div>
          </div>
          
          {/* Main wheel spokes with labels */}
          <div className="ship-wheel-spokes">
            {MAIN_SPOKES.map(({ id, angle, label }) => (
              <div key={`spoke-${id}`} className="spoke-wrapper" style={{ transform: `rotate(${angle}deg)` }}>
                <div className="spoke main-spoke" />
                <div className="spoke-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Decorative handles between main spokes */}
          <div className="ship-wheel-handles">
            {DECORATIVE_HANDLES.map(({ angle }, index) => (
              <div
                key={`handle-${index}`}
                className="wheel-handle"
                style={{ transform: `rotate(${angle}deg) translateY(-135px)` }}
              >
                <div className="handle-grip" />
              </div>
            ))}
          </div>

          <motion.div className="wheel-glow" layout />
          <motion.div className="wheel-orbit" style={{ rotate: rotation }}>
            {projects.map((project, index) => {
              const angle = index * angleStep - 90;
              const radians = (angle * Math.PI) / 180;
              const x = Math.cos(radians) * orbitRadius;
              const y = Math.sin(radians) * orbitRadius;
              const relativeAngle = angle + rotationValue;
              const depth = Math.cos((relativeAngle * Math.PI) / 180);
              const isActive = index === currentIndex;
              const scale = isActive ? 1.18 : 0.82 + Math.max(depth, 0) * 0.22;
              const opacity = 0.32 + Math.max(depth, 0) * 0.68;
              const blur = depth < -0.1 ? Math.abs(depth) * 6 : 0;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  className={`wheel-item ${index === currentIndex ? 'active' : ''}`}
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div
                    className="wheel-item-inner"
                    style={{
                      rotate: reverseRotation,
                      scale,
                      opacity,
                      filter: blur ? `blur(${blur}px)` : undefined,
                      background: `linear-gradient(152deg, ${project.color}3d 0%, ${project.color}14 100%)`,
                      boxShadow: isActive ? `0 18px 45px ${project.color}30` : undefined,
                    }}
                  >
                    <span className="wheel-project-name">{project.name}</span>
                    <span className="wheel-project-tagline">{project.tagline}</span>
                    <div className="wheel-stat-pills">
                      {project.stats.slice(0, 2).map((stat) => (
                        <span key={stat}>{stat}</span>
                      ))}
                    </div>
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          layout
          key={currentProject.id}
          className="wheel-detail-panel"
          style={{
            borderColor: `${currentProject.color}44`,
            background: `linear-gradient(165deg, ${currentProject.color}18 0%, transparent 60%)`,
            boxShadow: `0 25px 60px ${currentProject.color}1f`,
          }}
        >
          <span className="detail-index">Case {String(currentIndex + 1).padStart(2, '0')} of {itemCount}</span>
          <span className="detail-chip" style={{ background: `${currentProject.color}1a`, color: currentProject.color }}>
            {currentProject.role}
          </span>
          <h3>{currentProject.name}</h3>
          <p className="detail-tagline">{currentProject.tagline}</p>
          <p className="detail-summary">{currentProject.summary}</p>

          <div className="detail-metrics">
            {currentProject.metrics.map((metric) => (
              <div key={metric.label} className="metric-tile">
                <span className="metric-value" style={{ color: currentProject.color }}>{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="detail-tech">
            {currentProject.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="detail-links">
            {currentProject.links.demo && (
              <a href={currentProject.links.demo} target="_blank" rel="noopener noreferrer">View Live</a>
            )}
            {currentProject.links.code && (
              <a href={currentProject.links.code} target="_blank" rel="noopener noreferrer">Inspect Code</a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

RotatingProjectShowcase.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    role: PropTypes.string,
    summary: PropTypes.string,
    stats: PropTypes.arrayOf(PropTypes.string),
    metrics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
    techStack: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.shape({
      demo: PropTypes.string,
      code: PropTypes.string,
    }),
    color: PropTypes.string,
  })),
  activeIndex: PropTypes.number,
  onActiveChange: PropTypes.func,
};
