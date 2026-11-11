import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import { handleMouseMove, handleTouchEnd, handleHeadRotation, handleTouchMove } from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import { setProgress } from "../Loading";

function disposeModel(model: THREE.Object3D) {
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  model.traverse(child => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    (Array.isArray(child.material) ? child.material : [child.material]).forEach(material => materials.add(material));
  });
  materials.forEach(material => {
    Object.values(material).forEach(value => { if (value instanceof THREE.Texture) textures.add(value); });
    material.dispose();
  });
  textures.forEach(texture => texture.dispose());
}

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;
    const scene = new THREE.Scene();
    const context = gsap.context(() => {});
    const media = gsap.matchMedia();
    let renderer: THREE.WebGLRenderer;
    const showContent = () => {
      context.add(() => {
        gsap.set(".what-box-in", { display: "flex" });
        setAllTimeline();
      });
      setLoading(100);
    };
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch (error) {
      console.error("3D preview unavailable:", error);
      showContent();
      return () => context.revert();
    }
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(14.5, 1, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    handleResize(renderer, camera, canvasDiv);

    let disposed = false;
    let loadSettled = false;
    let model: THREE.Object3D | undefined;
    let animations: ReturnType<typeof setAnimations> | undefined;
    let hoverCleanup: (() => void) | undefined;
    let headBone: THREE.Object3D | undefined;
    let screenLight: THREE.Object3D | undefined;
    let introTimer: number | undefined;
    const light = setLighting(scene);
    const progress = setProgress(setLoading);
    const clock = new THREE.Clock();
    let frame = 0;
    let lastFrame = 0;
    let sectionVisible = true;
    const frameInterval = 1000 / (coarsePointer ? 30 : 60);
    const mouse = { x: 0, y: 0 };
    const interpolation = { x: 0.1, y: 0.2 };

    const animate = (now: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      if (now - lastFrame < frameInterval) return;
      lastFrame = now - ((now - lastFrame) % frameInterval);
      if (headBone) handleHeadRotation(headBone, mouse.x, mouse.y, interpolation.x, interpolation.y, THREE.MathUtils.lerp);
      if (screenLight) light.setPointLight(screenLight);
      animations?.mixer.update(Math.min(clock.getDelta(), 0.1));
      renderer.render(scene, camera);
    };
    const syncRendering = () => {
      cancelAnimationFrame(frame);
      if (!disposed && model && sectionVisible && !document.hidden) {
        clock.start();
        lastFrame = 0;
        frame = requestAnimationFrame(animate);
      }
    };
    // The canvas is fixed on desktop, so observe the sections where the model is shown.
    const visibility = new Map<Element, boolean>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting));
      sectionVisible = [...visibility.values()].some(Boolean);
      syncRendering();
    }, { rootMargin: "100px" });
    document.querySelectorAll(".landing-section, .about-section, .whatIDO").forEach(section => observer.observe(section));
    document.addEventListener("visibilitychange", syncRendering);
    syncRendering();

    const events = new AbortController();
    const options = { passive: true, signal: events.signal };
    document.addEventListener("mousemove", event => handleMouseMove(event, (x, y) => Object.assign(mouse, { x, y })), options);
    const landing = document.getElementById("landingDiv");
    landing?.addEventListener("touchmove", event => handleTouchMove(event, (x, y) => Object.assign(mouse, { x, y })), options);
    landing?.addEventListener("touchend", () => handleTouchEnd((x, y, ix, iy) => {
      Object.assign(mouse, { x, y });
      Object.assign(interpolation, { x: ix, y: iy });
    }), options);
    const resizeObserver = new ResizeObserver(() => handleResize(renderer, camera, canvasDiv));
    resizeObserver.observe(container);

    setCharacter(renderer, scene, camera, () => !disposed).loadCharacter().then(gltf => {
      if (disposed) { disposeModel(gltf.scene); return; }
      model = gltf.scene;
      scene.add(model);
      syncRendering();
      animations = setAnimations(gltf);
      if (hoverDivRef.current) hoverCleanup = animations.hover(gltf, hoverDivRef.current);
      headBone = model.getObjectByName("spine006");
      screenLight = model.getObjectByName("screenlight");
      media.add({ desktop: "(min-width: 1025px)", mobile: "(max-width: 1024px)" }, () => {
        setCharTimeline(model!, camera);
        setAllTimeline();
      });
      progress.loaded().then(() => {
        if (disposed) return;
        introTimer = window.setTimeout(() => {
          if (disposed) return;
          context.add(() => { light.turnOnLights(); animations?.startIntro(); });
        }, 2500);
      });
    }).catch(error => {
      if (disposed) return;
      console.error("Unable to load 3D preview:", error);
      progress.cancel();
      showContent();
    }).finally(() => {
      loadSettled = true;
      if (disposed) renderer.dispose();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(introTimer);
      progress.cancel();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", syncRendering);
      events.abort();
      hoverCleanup?.();
      animations?.dispose();
      media.revert();
      context.revert();
      light.dispose();
      if (model) disposeModel(model);
      scene.clear();
      // Shader compilation may still be polling WebGL programs during a StrictMode remount.
      // Release the renderer after loading settles so that polling can finish safely.
      if (loadSettled) renderer.dispose();
      renderer.domElement.remove();
    };
  }, [setLoading]);

  return <div className="character-container"><div className="character-model" ref={canvasDiv}><div className="character-rim" /><div className="character-hover" ref={hoverDivRef} /></div></div>;
};
export default Scene;
