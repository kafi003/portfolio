import { useCallback, useState } from "react";
import { projects } from "../data/projects";
import "./ProjectShowcase.css";
import RotatingProjectShowcase from "./RotatingProjectShowcase";

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActiveChange = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <section className="project-showcase-hub" id="projects" data-section="projects">
      <RotatingProjectShowcase
        projects={projects}
        activeIndex={activeIndex}
        onActiveChange={handleActiveChange}
      />
    </section>
  );
}
