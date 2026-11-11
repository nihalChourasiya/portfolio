import "./styles/Career.css";
const milestones = [
  { role: "M.Tech · Computer Science", place: "Indian Institute of Technology, Kanpur", date: "2025 – Present", detail: "CGPA: 8.77. Thesis: BODH, a healthcare AI model benchmarking platform, mentored by Prof. Nisheeth Srivastava." },
  { role: "Teaching Assistant · CS345", place: "Algorithms II · IIT Kanpur", date: "Jul 2026 – Present", detail: "Teaching assistant for CS345 Algorithms II." },
  { role: "Teaching Assistant · ESC111/2", place: "Fundamentals of Computing · IIT Kanpur", date: "Jul 2025 – May 2026", detail: "Teaching assistant for ESC111/2 Fundamentals of Computing." },
  { role: "Bachelor of Technology", place: "Madhav Institute of Technology and Science, Gwalior", date: "2021 – 2025", detail: "CGPA: 7.58." },
  { role: "Senior Secondary · CBSE", place: "Central Board of Secondary Education", date: "2021", detail: "88%." },
  { role: "Secondary · CBSE", place: "Central Board of Secondary Education", date: "2019", detail: "94.6%." },
];
const Career = () => (
  <div className="career-section section-container" id="education">
    <div className="career-container">
      <h2>Education <span>&</span><br /> teaching</h2>
      <div className="career-info">
        <div className="career-timeline"><div className="career-dot" /></div>
        {milestones.map(item => <div className="career-info-box" key={item.role}>
          <div className="career-info-in"><div className="career-role"><h4>{item.role}</h4><h5>{item.place}</h5><h3>{item.date}</h3></div></div>
          <p>{item.detail}</p>
        </div>)}
      </div>
    </div>
  </div>
);
export default Career;
