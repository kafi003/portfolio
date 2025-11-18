import {
    ContactShadows,
    Environment,
    Float,
    PresentationControls
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { Iphone17 } from "./Iphone17";
import { MacbookPro } from "./MacbookPro";

export function Device3DCanvas({ device = "iphone", currentProject }) {
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <Canvas
        camera={{ 
          position: [0, 0, device === "macbook" ? 5 : 4], 
          fov: 28 
        }}
        shadows
        dpr={[1, 2]} // Retina display support
        gl={{ 
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        onCreated={(state) => {
          state.gl.setClearColor('#000000', 0)
        }}
      >
        {/* Apple-level lighting setup */}
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight 
          position={[-5, 5, 5]} 
          intensity={0.8}
          castShadow
        />
        <directionalLight 
          position={[5, 5, -5]} 
          intensity={0.4}
        />
        
        {/* HDRI environment for realistic reflections */}
        <Environment 
          preset="studio" 
          background={false}
          blur={0.8}
        />
        
        {/* Presentation controls for interactive rotation */}
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.4}
          >
            <Suspense 
              fallback={
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#333" />
                </mesh>
              }
            >
              {device === "iphone" ? (
                <Iphone17 currentProject={currentProject} />
              ) : (
                <MacbookPro currentProject={currentProject} />
              )}
            </Suspense>
          </Float>
        </PresentationControls>
        
        {/* Realistic contact shadows */}
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />
      </Canvas>
      
      {/* Loading fallback */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(255,255,255,0.5)",
          fontSize: "14px",
          fontFamily: "system-ui",
          pointerEvents: "none"
        }}
      >
        Loading 3D model...
      </div>
    </div>
  );
}
