import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cursor = cursorRef.current!;
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power2.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power2.out" });
      const onMove = (event: PointerEvent) => {
        const target = (event.target as Element).closest<HTMLElement>("[data-cursor]");
        const icons = target?.dataset.cursor === "icons";
        cursor.classList.toggle("cursor-icons", icons);
        cursor.classList.toggle("cursor-disable", target?.dataset.cursor === "disable");
        if (icons) {
          const rect = target!.getBoundingClientRect();
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          xTo(rect.left);
          yTo(rect.top);
        } else {
          xTo(event.clientX);
          yTo(event.clientY);
        }
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        document.removeEventListener("pointermove", onMove);
        xTo.tween.kill();
        yTo.tween.kill();
      };
    });
    return () => media.revert();
  }, []);
  return <div className="cursor-main" ref={cursorRef} aria-hidden="true" />;
};
export default Cursor;
