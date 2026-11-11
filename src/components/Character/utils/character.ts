import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  isActive: () => boolean = () => true
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    try {
      const data = await decryptFile("/models/character.enc", "Character3D#@");
      const gltf = await loader.parseAsync(data, "/models/");
      if (isActive()) await renderer.compileAsync(gltf.scene, camera, scene);
      gltf.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = true;
        }
      });
      const footR = gltf.scene.getObjectByName("footR");
      const footL = gltf.scene.getObjectByName("footL");
      if (footR) footR.position.y = 3.36;
      if (footL) footL.position.y = 3.36;
      return gltf;
    } finally {
      dracoLoader.dispose();
    }
  };
  return { loadCharacter };
};
export default setCharacter;
