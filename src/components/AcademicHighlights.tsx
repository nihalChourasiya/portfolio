import { profile } from "../data/portfolio";
import "./styles/ProfileDetails.css";
const AcademicHighlights = () => (
  <section className="highlights-section section-container" id="highlights">
    <p className="section-eyebrow">Learning & problem solving</p><h2>Beyond the <span>projects</span></h2>
    <div className="achievement-grid">
      <div><strong>400+</strong><h3>Problems solved on LeetCode</h3><p>1600+ rating · Top 21%, as listed in my resume.</p><a href={profile.leetcode} target="_blank" rel="noopener noreferrer">LeetCode profile ↗</a></div>
      <div><strong>GATE CS</strong><h3>Qualified in 2024 & 2025</h3><p>A foundation in computer science, algorithms, and problem solving.</p></div>
    </div>
    <h3 className="coursework-title">Relevant coursework</h3>
    <div className="coursework-list">{["Advanced Data Structures", "Parallel Computing · A grade", "Deep Learning for Computer Vision", "Cryptography Protocols", "Design & Analysis of Algorithms · A grade", "Introduction to Machine Learning"].map(course => <span key={course}>{course}</span>)}</div>
  </section>
);
export default AcademicHighlights;
