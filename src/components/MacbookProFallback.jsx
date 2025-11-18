import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

export function MacbookProFallback({ currentProject }) {
  const groupRef = useRef();
  const lidPivotRef = useRef();
  
  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (lidPivotRef.current) {
      lidPivotRef.current.rotation.x = -Math.PI * 0.65 + Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
    }
  });

  const screenColor = useMemo(() => currentProject?.color || "#58a6ff", [currentProject]);

  return (
    <group ref={groupRef} scale={0.5} position={[0, -0.5, 0]}>
      {/* MacBook Base */}
      <group position={[0, 0.06, 0]} rotation={[-Math.PI * 0.05, 0, 0]}>
        <RoundedBox args={[4, 0.12, 2.8]} radius={0.35} smoothness={8} castShadow receiveShadow>
          <meshStandardMaterial
            color="#111117"
            metalness={0.9}
            roughness={0.3}
            envMapIntensity={1.4}
          />
        </RoundedBox>

        <RoundedBox args={[3.6, 0.02, 2.4]} radius={0.28} smoothness={6} position={[0, 0.08, 0]}>
          <meshStandardMaterial color="#1a1a1e" metalness={0.35} roughness={0.75} />
        </RoundedBox>

        {/* Trackpad */}
        <RoundedBox args={[1.4, 0.005, 0.9]} radius={0.1} smoothness={5} position={[0, 0.091, 0.35]}>
          <meshStandardMaterial color="#151519" metalness={0.2} roughness={0.6} />
        </RoundedBox>
      </group>

      {/* Lid + Screen */}
      <group ref={lidPivotRef} position={[0, 0.2, -1.4]}>
        {/* Hinge */}
        <RoundedBox args={[4, 0.15, 0.25]} radius={0.08} smoothness={5} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0f0f14" metalness={0.9} roughness={0.25} />
        </RoundedBox>

        <group position={[0, 0.1, -0.12]}>
          <RoundedBox args={[4, 2.5, 0.12]} radius={0.25} smoothness={8}>
            <meshStandardMaterial color="#121216" metalness={0.9} roughness={0.28} envMapIntensity={1.3} />
          </RoundedBox>

          <RoundedBox args={[3.72, 2.32, 0.01]} radius={0.2} smoothness={8} position={[0, 0, 0.07]}>
            <meshStandardMaterial
              color={screenColor}
              emissive={screenColor}
              emissiveIntensity={0.45}
              toneMapped={false}
            />
          </RoundedBox>

          {/* Notch */}
          <RoundedBox args={[0.4, 0.1, 0.04]} radius={0.04} smoothness={4} position={[0, 1.08, 0.06]}>
            <meshStandardMaterial color="#000000" />
          </RoundedBox>
        </group>
      </group>

      {/* Display glow */}
      <pointLight position={[0, 1.4, -0.8]} intensity={1.5} color={screenColor} distance={4} decay={3} />
    </group>
  );
}
