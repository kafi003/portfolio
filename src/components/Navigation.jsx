import { useEffect, useState } from "react";
import "./Navigation.css";

const NAV_ITEMS = [
  { key: "home", label: "Overview", href: "#home" },
  { key: "education", label: "Academics", href: "#education" },
  { key: "projects", label: "Case", href: "#projects" },
  { key: "projects-detail", label: "Systems", href: "#projects-detail" },
  { key: "experience", label: "Experience", href: "#experience" },
  { key: "leadership", label: "Leadership", href: "#leadership" },
  { key: "skills", label: "Stack", href: "#skills" },
  { key: "contact", label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [activeKey, setActiveKey] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const key = visible[0].target.getAttribute("data-section");
          if (key) {
            setActiveKey(key);
          }
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-30% 0px -50% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className={`nav-panel ${scrolled ? "nav-panel--compact" : ""}`}>
      <div className="nav-panel__inner">
        <div className="nav-panel__heading">
          <span className="nav-panel__eyebrow">Ramish Anan Kafi</span>
          <h1>Backend Engineer</h1>
          <p>Distributed Systems · Scalable Infrastructure</p>
          <div className="nav-panel__contact-links" style={{marginTop:'1.1rem',display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'0.7rem'}}>
            <button className="nav-panel__button nav-panel__button--highlight" style={{opacity:0.5,cursor:'not-allowed'}} disabled>View Résumé</button>
            <a href="mailto:rakafi003@gmail.com" className="nav-panel__button nav-panel__button--highlight">rakafi003@gmail.com</a>
            <div className="nav-panel__social" style={{display:'flex',gap:'0.7rem',flexWrap:'wrap',marginTop:'0.2rem'}}>
              <a href="https://github.com/kafi003" target="_blank" rel="noopener" className="nav-panel__button nav-panel__button--highlight">GitHub</a>
              <a href="https://www.linkedin.com/in/kafi003" target="_blank" rel="noopener" className="nav-panel__button nav-panel__button--highlight">LinkedIn</a>
              <a href="https://www.pexels.com/@ramish-anan-kafi-2154523264/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnISYhZzLkfbArnS2GjYUCl6sPv2fY2HXGv0NU4NtxgGtQak10Tb-wbcHtRDo_aem_4-CCY0j7nxGRU5RjjNYYww" target="_blank" rel="noopener" className="nav-panel__button nav-panel__button--highlight">Photography</a>
            </div>
          </div>
        </div>

        <nav className="nav-panel__nav" aria-label="Primary">
          <ol>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className={item.key === activeKey ? "is-active" : ""}
                  aria-current={item.key === activeKey ? "true" : undefined}
                >
                  <span className="nav-panel__item-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="nav-panel__item-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
