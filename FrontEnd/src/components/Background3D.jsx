import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Icosahedron = ({ isAlert }) => {
  const meshRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;

      // Mouse interaction: React to pointer movement
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 2, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 2, 0.1);
      
      if (isAlert) {
        meshRef.current.rotation.x += 0.05;
        meshRef.current.rotation.y += 0.05;
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1, 15]} />
      <meshBasicMaterial 
        color={isAlert ? "#ff5555" : "#6272a4"} 
        wireframe 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  );
};

const Background3D = ({ isAlert }) => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Icosahedron isAlert={isAlert} />
      </Float>
    </Canvas>
  );
};

export default Background3D;
