import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Frontend from "./Frontend";
import AcademicHighlights from "./AcademicHighlights";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

import TechStack from "./TechStack";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1025px)");
    const onBreakpoint = () => setIsDesktopView(desktop.matches);
    let cleanupText = setSplitText();
    let timer: number | undefined;
    let width = window.innerWidth;
    const onResize = () => {
      if (width === window.innerWidth) return;
      width = window.innerWidth;
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        cleanupText?.();
        cleanupText = setSplitText();
      }, 180);
    };
    desktop.addEventListener("change", onBreakpoint);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      desktop.removeEventListener("change", onBreakpoint);
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
      cleanupText?.();
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Frontend />
            <Work />
            <TechStack />
            <AcademicHighlights />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
