import { projects } from "../data/portfolio";
import "./styles/ProfileDetails.css";

const interfaces = [
  { project: "BODH", title: "React + API-backed platform", text: "A React frontend for a healthcare AI model benchmarking platform, paired with FastAPI and PostgreSQL.", tags: ["React", "FastAPI", "PostgreSQL"] },
  { project: "CDCIR", title: "Interactive image search", text: "A real-time Gradio demo that accepts a reference image and text instructions. Precomputed image features reduce retrieval work for each search.", tags: ["Gradio", "Image + text inputs", "Feature caching"] },
  { project: "IITK Ride Connect", title: "Campus driver discovery", text: "A Flask web app that connects campus riders with nearby auto-rickshaws. SMS-based availability lets drivers participate without smartphones or mobile data.", tags: ["Flask", "MongoDB", "SMS availability"] },
];

const Frontend = () => (
  <section className="frontend-section section-container" id="frontend">
    <p className="section-eyebrow">Frontend & web applications</p>
    <h2>Interfaces for <span>real use cases</span></h2>
    <p className="frontend-intro">From a React platform to an interactive ML demo, my projects connect web interfaces with the systems behind them.</p>
    <div className="frontend-grid">
      {interfaces.map(item => {
        const project = projects.find(project => project.name === item.project)!;
        return <article className="frontend-card" key={item.project}>
          <p className="section-eyebrow">{item.project}</p>
          <h3>{item.title}</h3><p>{item.text}</p>
          <div className="skill-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <a href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel ?? "View project ↗"}</a>
        </article>;
      })}
    </div>
  </section>
);
export default Frontend;
