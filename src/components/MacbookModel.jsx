import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { applyScreenTexture, findScreenMesh, loadTexture } from "./helpers";

const DEFAULT_MODEL_PATH = "/macbook_m4.glb";
const LID_KEYWORDS = ["lid", "screen", "display", "top", "monitor"];

export default function MacbookModel({
  modelPath = DEFAULT_MODEL_PATH,
  screenUrl,
  openAmount = 0.35,
  accentColor = "#ffffff",
}) {
  const gltf = useGLTF(modelPath, true);
  const rootRef = useRef();
  const lidRef = useRef(null);
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

  const { scene, lid } = useMemo(() => {
    if (!gltf?.scene) return { scene: null, lid: null };

    const clone = gltf.scene.clone(true);
    let lidNode = null;

    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }

      if (!lidNode) {
        const name = (child.name || "").toLowerCase();
        if (LID_KEYWORDS.some((keyword) => name.includes(keyword))) {
          lidNode = child;
        }
      }
    });

    const screenMesh = findScreenMesh(clone);
    if (!screenMesh) {
      console.warn("MacbookModel: screen mesh not located. Update helpers.js with explicit mesh name.");
    } else {
      applyScreenTexture(screenMesh, screenTexture, {
        emissiveColor: accentColor,
        emissiveIntensity: screenTexture ? 0.3 : 0.15,
        fallbackColor: accentColor,
      });
    }

    return { scene: clone, lid: lidNode };
  }, [gltf, screenTexture, accentColor]);

  useEffect(() => {
    lidRef.current = lid;
  }, [lid]);

  useFrame((state) => {
    const root = rootRef.current;
    if (!root) return;
    const t = state.clock.getElapsedTime();
    root.position.y = Math.sin(t * 0.9) * 0.02 - 0.03;
    root.rotation.y = Math.sin(t * 0.25) * 0.2;

    if (lidRef.current) {
      lidRef.current.rotation.x = -openAmount + Math.sin(t * 0.5) * 0.02;
    }
  });

  if (!scene) return null;

  return (
    <group ref={rootRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(DEFAULT_MODEL_PATH);
