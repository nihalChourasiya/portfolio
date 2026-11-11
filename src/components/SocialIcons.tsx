import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { profile } from "../data/portfolio";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Nihal on GitHub"><FaGithub /></a></span>
        <span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Nihal on LinkedIn"><FaLinkedinIn /></a></span>
        <span><a href={profile.leetcode} target="_blank" rel="noopener noreferrer" aria-label="Nihal on LeetCode"><SiLeetcode /></a></span>
      </div>
      <a className="resume-button" href={profile.resume} download>
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
