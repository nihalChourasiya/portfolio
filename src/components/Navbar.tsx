import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    const onClick = (event: Event) => {
      if (window.innerWidth <= 1024) return;
      event.preventDefault();
      const section = (event.currentTarget as HTMLAnchorElement).dataset.href;
      if (section) smoother.scrollTo(section, true, "top top");
    };
    links.forEach(link => link.addEventListener("click", onClick));
    return () => {
      links.forEach(link => link.removeEventListener("click", onClick));
      smoother.kill();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          NC.
        </a>
        <a
          href="mailto:nhlchrs@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          nhlchrs@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li><a data-href="#education" href="#education"><HoverLinks text="EDUCATION" /></a></li>
          <li><a data-href="#skills" href="#skills"><HoverLinks text="SKILLS" /></a></li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
