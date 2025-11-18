import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Fallback 3D iPhone (procedural geometry if GLB not found)
export function Iphone17Fallback({ currentProject }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Try to load screen texture
  const [screenTexture, setScreenTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const texturePath =
      currentProject?.screenTexture || currentProject?.screenshot || "/screen1.png";
    
    loader.load(
      texturePath,
      (texture) => setScreenTexture(texture),
      undefined,
      () => console.log(`Screenshot not found: ${texturePath}`)
    );
  }, [currentProject]);

  // Smooth rotation
  useFrame((state) => {
    if (groupRef.current && !hovered) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* iPhone Frame (Titanium) */}
      <RoundedBox args={[1.2, 2.6, 0.15]} radius={0.15} smoothness={6} castShadow>
        <meshStandardMaterial
          color="#48484e"
          metalness={0.9}
          roughness={0.3}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox
        args={[1.1, 2.45, 0.01]}
        radius={0.13}
        smoothness={6}
        position={[0, 0, 0.076]}
      >
        <meshStandardMaterial
          map={screenTexture}
          emissive="#ffffff"
          emissiveIntensity={screenTexture ? 0.4 : 0}
          emissiveMap={screenTexture}
          color={screenTexture ? "#ffffff" : "#000000"}
        />
      </RoundedBox>

      {/* Dynamic Island */}
      <RoundedBox
        args={[0.32, 0.1, 0.02]}
        radius={0.04}
        smoothness={4}
        position={[0, 1.1, 0.08]}
      >
        <meshStandardMaterial color="#000000" />
      </RoundedBox>

      {/* Camera Module */}
      <group position={[-0.35, 1.05, -0.08]}>
        {/* Camera Bump */}
        <mesh>
          <boxGeometry args={[0.35, 0.35, 0.05]} />
          <meshStandardMaterial
            color="#48484e"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>

        {/* Main Camera Lens */}
        <mesh position={[0, 0.08, 0.03]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.2}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Ultra Wide Lens */}
        <mesh position={[-0.08, -0.08, 0.03]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.2}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Telephoto Lens */}
        <mesh position={[0.08, -0.08, 0.03]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.2}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* LiDAR Scanner */}
        <mesh position={[0, -0.08, 0.03]}>
          <cylinderGeometry args={[0.04, 0.04, 0.015, 32]} />
          <meshStandardMaterial
            color="#330000"
            emissive="#ff0000"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}
