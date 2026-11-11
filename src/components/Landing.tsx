import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              NIHAL
              <br />
              <span>CHOURASIYA</span>
            </h1>
            <p className="landing-credential">M.Tech · Computer Science<br />IIT Kanpur</p>
          </div>
          <div className="landing-info">
            <h3>I build</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Systems</div>
              <div className="landing-h2-2">Web apps</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Web apps</div>
              <div className="landing-h2-info-1">Systems</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
