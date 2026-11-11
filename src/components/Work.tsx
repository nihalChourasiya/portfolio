import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { projects } from "../data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  // Initialize after Navbar creates ScrollSmoother in its effect.
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 901px)", () => {
      const track = document.querySelector<HTMLElement>(".work-flex")!;
      const container = document.querySelector<HTMLElement>(".work-container")!;
      // Measure cards only: decorative pseudo-elements must never extend the scroll range.
      const distance = () => {
        const lastCard = track.lastElementChild as HTMLElement | null;
        if (!lastCard) return 0;
        const contentWidth = lastCard.offsetLeft + lastCard.offsetWidth;
        return Math.max(0, contentWidth - container.clientWidth);
      };
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".work-section", start: "top top", end: () => `+=${distance()}`,
          scrub: true, pin: true, id: "work", invalidateOnRefresh: true,
        },
      });
    });
    // React moves the hero canvas at its breakpoint. Refresh after that layout has settled,
    // rather than capturing a mobile-width pin spacer when returning to desktop.
    let refreshTimer: number | undefined;
    const onResize = () => {
      clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(refreshTimer);
      media.revert();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Selected <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <article className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title"><h3>0{index + 1}</h3><div><h4>{project.name}</h4><p>{project.category}</p></div></div>
                <p className="project-date">{project.date}</p>
                <p className="project-description">{project.description}</p>
                <h4>Built with</h4><p>{project.tools}</p>
                <div className="project-links"><a href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel ?? "View source ↗"}</a></div>
              </div>
              <WorkImage image={project.image} alt={`${project.name} concept illustration`} link={project.link} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
