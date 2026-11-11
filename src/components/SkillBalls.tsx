import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";

const labels = ["React", "JavaScript", "HTML", "Python", "C++", "FastAPI", "Node.js", "Docker", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Git", "Linux", "MPI", "Gradio"];
const accents = ["#9cdfff", "#ffe28c", "#ffb08e", "#a4bfff", "#c4a6ff", "#9cf0dc"];

function labelTexture(label: string, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#21132e";
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = accents[index % accents.length];
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${label.length > 8 ? 38 : 48}px sans-serif`;
  // Repeat the label so that it appears on both sides as the ball rotates.
  ctx.fillText(label, 128, 128, 225);
  ctx.fillText(label, 384, 128, 225);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function SkillBall({ index }: { index: number }) {
  const body = useRef<RapierRigidBody>(null);
  const force = useMemo(() => new THREE.Vector3(), []);
  const scale = 0.7 + (index % 3) * 0.12;
  const position = useMemo<[number, number, number]>(() => [
    ((index % 5) - 2) * 2.2,
    Math.floor(index / 5) * 2.1 - 6,
    (index % 3) - 1,
  ], [index]);
  const texture = useMemo(() => labelTexture(labels[index % labels.length], index), [index]);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame((_, delta) => {
    if (!body.current) return;
    force.copy(body.current.translation()).normalize();
    const step = Math.min(delta, 0.05) * scale;
    force.set(force.x * -45 * step, force.y * -70 * step, force.z * -45 * step);
    body.current.applyImpulse(force, true);
  });
  return <RigidBody ref={body} position={position} linearDamping={0.8} angularDamping={0.3} friction={0.2} colliders={false}>
    <BallCollider args={[scale]} />
    <mesh scale={scale} rotation={[0.1, index * 0.7, 0]}>
      <sphereGeometry args={[1, 24, 20]} />
      <meshStandardMaterial map={texture} emissiveMap={texture} emissive="#ffffff" emissiveIntensity={0.35} metalness={0.25} roughness={0.45} />
    </mesh>
  </RigidBody>;
}

function Pointer() {
  const body = useRef<RapierRigidBody>(null);
  const target = useMemo(() => new THREE.Vector3(100, 100, 100), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ pointer, viewport }) => {
    desired.set(pointer.x * viewport.width / 2, pointer.y * viewport.height / 2, 0);
    target.lerp(desired, 0.2);
    body.current?.setNextKinematicTranslation(target);
  });
  return <RigidBody ref={body} type="kinematicPosition" position={[100, 100, 100]} colliders={false}><BallCollider args={[1.5]} /></RigidBody>;
}

const SkillBalls = ({ active }: { active: boolean }) => (
  <Canvas
    frameloop={active ? "always" : "never"}
    dpr={[1, 1.5]}
    gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    camera={{ position: [0, 0, 24], fov: 40, near: 1, far: 100 }}
    aria-label="Interactive 3D balls labeled with my technical skills"
  >
    <ambientLight intensity={1.5} />
    <directionalLight position={[5, 8, 10]} intensity={3} />
    <Physics gravity={[0, 0, 0]} paused={!active}>
      <Pointer />
      {Array.from({ length: 24 }, (_, index) => <SkillBall key={index} index={index} />)}
    </Physics>
    <Environment files="/models/char_enviorment.hdr" environmentIntensity={0.5} />
  </Canvas>
);
export default SkillBalls;
