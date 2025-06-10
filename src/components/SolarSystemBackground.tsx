
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Planet component with realistic materials and atmospheric glow
const Planet = ({ 
  radius, 
  orbitRadius, 
  orbitSpeed, 
  rotationSpeed, 
  color,
  emissive = "#000000",
  roughness = 0.8,
  metalness = 0.1,
  hasAtmosphere = false,
  atmosphereColor = "#4FC3F7",
  position = [0, 0, 0] 
}: {
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  color: string;
  emissive?: string;
  roughness?: number;
  metalness?: number;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  position?: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Orbit around center
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * orbitSpeed;
    }
    
    // Self rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = time * rotationSpeed;
    }
    
    // Atmosphere pulsing effect
    if (atmosphereRef.current && hasAtmosphere) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
    }
  });

  return (
    <group ref={orbitRef} position={position}>
      <group position={[orbitRadius, 0, 0]}>
        {/* Main planet */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshPhysicalMaterial 
            color={color}
            emissive={emissive}
            roughness={roughness}
            metalness={metalness}
            clearcoat={0.1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Atmospheric glow */}
        {hasAtmosphere && (
          <mesh ref={atmosphereRef}>
            <sphereGeometry args={[radius * 1.1, 32, 32]} />
            <meshBasicMaterial 
              color={atmosphereColor}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

// Enhanced Sun with corona and solar flares
const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const flareRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
    }
    
    // Corona animation
    if (coronaRef.current) {
      coronaRef.current.rotation.y = time * 0.05;
      coronaRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
    }
    
    // Solar flare animation
    if (flareRef.current) {
      flareRef.current.rotation.z = time * 0.2;
      flareRef.current.scale.setScalar(1 + Math.sin(time * 4) * 0.1);
    }
  });

  return (
    <group>
      {/* Main sun body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          color="#FDB813"
          emissive="#FF6B35"
          emissiveIntensity={0.5}
        />
        <pointLight intensity={3} color="#FDB813" distance={100} decay={2} />
      </mesh>
      
      {/* Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial 
          color="#FF8C42"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Solar flares */}
      <mesh ref={flareRef}>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial 
          color="#FFD23F"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Enhanced asteroid belt with varied sizes and types
const AsteroidBelt = ({ count = 200, radius = 30 }: { count?: number; radius?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = radius + (Math.random() - 0.5) * 8;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = (Math.random() - 0.5) * 4;
      temp.push({
        position: new Vector3(x, y, z),
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.05 + Math.random() * 0.15
      });
    }
    return temp;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      asteroids.forEach((asteroid, i) => {
        const matrix = new THREE.Matrix4();
        const time = clock.getElapsedTime();
        
        const angle = time * 0.03 + (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * (radius + (asteroid.position.y * 0.3));
        const z = Math.sin(angle) * (radius + (asteroid.position.y * 0.3));
        
        matrix.makeRotationFromEuler(new THREE.Euler(
          asteroid.rotation[0] + time * 0.1,
          asteroid.rotation[1] + time * 0.08,
          asteroid.rotation[2] + time * 0.12
        ));
        matrix.setPosition(x, asteroid.position.y, z);
        matrix.scale(new Vector3(asteroid.scale, asteroid.scale, asteroid.scale));
        
        meshRef.current?.setMatrixAt(i, matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.1, 1]} />
      <meshStandardMaterial 
        color="#8C7853"
        roughness={0.9}
        metalness={0.3}
      />
    </instancedMesh>
  );
};

// Nebula background effect
const Nebula = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.01;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[150, 32, 32]} />
      <meshBasicMaterial 
        color="#2D1B69"
        transparent
        opacity={0.3}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Main enhanced solar system scene
const SolarSystemScene = () => {
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.05} color="#1a1a2e" />
      <directionalLight 
        position={[0, 10, 5]} 
        intensity={0.3} 
        color="#ffffff"
      />
      
      {/* Nebula background */}
      <Nebula />
      
      {/* Enhanced stars */}
      <Stars radius={200} depth={80} count={25000} factor={8} fade speed={0.5} />
      
      {/* Enhanced sun */}
      <Sun />
      
      {/* Realistic planets with enhanced materials */}
      {/* Mercury */}
      <Planet
        radius={0.25}
        orbitRadius={5}
        orbitSpeed={0.9}
        rotationSpeed={0.1}
        color="#8C7853"
        roughness={0.9}
        metalness={0.1}
      />
      
      {/* Venus */}
      <Planet
        radius={0.35}
        orbitRadius={7}
        orbitSpeed={0.7}
        rotationSpeed={0.05}
        color="#FFC649"
        emissive="#FFB000"
        hasAtmosphere={true}
        atmosphereColor="#FFD700"
        roughness={0.3}
      />
      
      {/* Earth */}
      <Planet
        radius={0.4}
        orbitRadius={10}
        orbitSpeed={0.5}
        rotationSpeed={1.0}
        color="#6B93D6"
        emissive="#1E3A8A"
        hasAtmosphere={true}
        atmosphereColor="#87CEEB"
        roughness={0.7}
        metalness={0.2}
      />
      
      {/* Mars */}
      <Planet
        radius={0.3}
        orbitRadius={13}
        orbitSpeed={0.4}
        rotationSpeed={0.9}
        color="#CD5C5C"
        emissive="#8B0000"
        hasAtmosphere={true}
        atmosphereColor="#FFB6C1"
        roughness={0.8}
      />
      
      {/* Jupiter */}
      <Planet
        radius={1.2}
        orbitRadius={18}
        orbitSpeed={0.2}
        rotationSpeed={2.0}
        color="#D2691E"
        emissive="#8B4513"
        hasAtmosphere={true}
        atmosphereColor="#DEB887"
        roughness={0.6}
        metalness={0.1}
      />
      
      {/* Saturn */}
      <Planet
        radius={1.0}
        orbitRadius={24}
        orbitSpeed={0.15}
        rotationSpeed={1.8}
        color="#FAD5A5"
        emissive="#F4A460"
        hasAtmosphere={true}
        atmosphereColor="#F5DEB3"
        roughness={0.5}
      />
      
      {/* Enhanced asteroid belt */}
      <AsteroidBelt count={300} radius={35} />
      
      {/* Enhanced orbit controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.8}
        rotateSpeed={0.3}
        minDistance={8}
        maxDistance={120}
        autoRotate={true}
        autoRotateSpeed={0.3}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </>
  );
};

export const SolarSystemBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 25, 50], fov: 60 }}
        style={{ background: 'radial-gradient(circle, #0a0a0a 0%, #1a0033 50%, #000000 100%)' }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        <SolarSystemScene />
      </Canvas>
    </div>
  );
};
