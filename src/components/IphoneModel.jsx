import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { applyScreenTexture, findScreenMesh, loadTexture } from "./helpers";

const DEFAULT_MODEL_PATH = "/iphone17.glb";
const DEFAULT_ROTATION_SPEED = 0.6;

export default function IphoneModel({
  modelPath = DEFAULT_MODEL_PATH,
  screenUrl,
  rotationSpeed = DEFAULT_ROTATION_SPEED,
  floatAmplitude = 0.03,
  accentColor = "#ffffff",
}) {
  const gltf = useGLTF(modelPath, true);
  const groupRef = useRef();
  const [screenTexture, setScreenTexture] = useState(null);

  useEffect(() => {
    let disposeTexture = null;

    if (screenUrl) {
      disposeTexture = loadTexture(
        screenUrl,
        (texture) => setScreenTexture(texture),
        () => setScreenTexture(null),
      );
    } else {
      setScreenTexture(null);
    }

    return () => {
      disposeTexture?.();
    };
  }, [screenUrl]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const time = state.clock.getElapsedTime();
    group.rotation.y = time * rotationSpeed;
    group.position.y = Math.sin(time * 0.6) * floatAmplitude;
  });

  const scene = useMemo(() => {
    if (!gltf?.scene) return null;
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });

    const screenMesh = findScreenMesh(clone);
    if (!screenMesh) {
      console.warn("IphoneModel: screen mesh not located. Update helpers.js with explicit mesh name.");
    } else {
      applyScreenTexture(screenMesh, screenTexture, {
        emissiveColor: accentColor,
        emissiveIntensity: screenTexture ? 0.45 : 0.2,
        fallbackColor: accentColor,
      });
    }

    return clone;
  }, [gltf, screenTexture, accentColor]);

  if (!scene) return null;

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(DEFAULT_MODEL_PATH);
