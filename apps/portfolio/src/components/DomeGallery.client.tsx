// src/components/DomeGallery.client.tsx
'use client';

import { useMemo, useRef } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';
import * as THREE from 'three';

// src/components/DomeGallery.client.tsx

// src/components/DomeGallery.client.tsx

function SphereItem({
  position,
  index,
}: {
  position: THREE.Vector3;
  index: number;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.15 + index * 0.01, 32, 32]} />
      <meshStandardMaterial
        color={`hsl(${(index * 137) % 360}, 70%, 60%)`}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

function CameraController({ target }: { target: THREE.Vector3 }) {
  useFrame(({ camera }) => {
    camera.position.lerp(target, 0.08);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ✅ Named export (wajib!)
export function DomeGallery() {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 5));

  const items = useMemo(() => {
    const count = 60;
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = 3 * Math.sin(phi) * Math.cos(theta);
      const y = 3 * Math.cos(phi);
      const z = 3 * Math.sin(phi) * Math.sin(theta);
      positions.push(new THREE.Vector3(x, y, z));
    }
    return positions;
  }, []);

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const theta = (x / width) * Math.PI * 2;
      const phi = (y / height) * Math.PI;
      const radius = 4;
      const clampedPhi = Math.min(Math.PI - 0.1, Math.max(0.1, phi));
      cameraTarget.current.set(
        radius * Math.sin(clampedPhi) * Math.cos(theta),
        radius * Math.cos(clampedPhi),
        radius * Math.sin(clampedPhi) * Math.sin(theta)
      );
    },
    onPinch: ({ offset: [d] }) => {
      const current = cameraTarget.current.length();
      const newRadius = Math.max(2, Math.min(8, current - d * 0.01));
      cameraTarget.current.setLength(newRadius);
    },
  });

  return (
    <div
      {...bind()}
      style={{ width: '100vw', height: '100vh', background: '#000' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {items.map((pos, i) => (
          <SphereItem key={i} position={pos} index={i} />
        ))}
        <CameraController target={cameraTarget.current} />
      </Canvas>
    </div>
  );
}
