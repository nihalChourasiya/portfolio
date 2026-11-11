import { Component, lazy, Suspense, useEffect, useRef, useState, type PropsWithChildren } from "react";
import { skillGroups } from "../data/portfolio";
import "./styles/ProfileDetails.css";

const SkillBalls = lazy(() => import("./SkillBalls"));

// Keep the readable skills available if a device cannot initialize WebGL.
class AnimationBoundary extends Component<PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const TechStack = () => {
  const animation = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  useEffect(() => {
    const section = animation.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setReady(true);
    }, { rootMargin: "150px" });
    observer.observe(section);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <section className="skills-section section-container" id="skills">
    <p className="section-eyebrow">The toolkit</p><h2>Technical <span>skills</span></h2>
    <div className="skill-balls" ref={animation}>
      <AnimationBoundary><Suspense fallback={<p className="skill-balls-loading">Loading interactive skills…</p>}>
        {ready && <SkillBalls active={visible && tabVisible} />}
      </Suspense></AnimationBoundary>
    </div>
    <div className="skills-grid">{skillGroups.map(group => <div className="skill-group" key={group.title}><h3>{group.title}</h3><div className="skill-list">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
  </section>;
};
export default TechStack;
