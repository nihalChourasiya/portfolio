import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { profile } from "../data/portfolio";
import "./styles/Contact.css";
const Contact = () => (
  <footer className="contact-section section-container" id="contact">
    <div className="contact-container"><h3>Let's connect</h3><p className="contact-intro">Interested in frontend development, backend systems, or applied ML? I'd be happy to connect.</p>
      <div className="contact-flex">
        <div className="contact-box"><h4>Email</h4><p><a href={`mailto:${profile.email}`} data-cursor="disable">{profile.email}</a></p><h4>Based at</h4><p>IIT Kanpur · India</p><a href={profile.resume} download data-cursor="disable">Download resume ↓</a></div>
        <div className="contact-box"><h4>Find me online</h4>{[["GitHub", profile.github], ["LinkedIn", profile.linkedin], ["LeetCode", profile.leetcode]].map(([label, url]) => <a href={url} target="_blank" rel="noopener noreferrer" data-cursor="disable" className="contact-social" key={label}>{label} <MdArrowOutward /></a>)}</div>
        <div className="contact-box"><h2><span>Nihal Chourasiya</span><br />M.Tech · Computer Science<br />Indian Institute of Technology, Kanpur</h2><h5><MdCopyright /> {new Date().getFullYear()} Nihal Chourasiya</h5></div>
      </div>
    </div>
  </footer>
);
export default Contact;
