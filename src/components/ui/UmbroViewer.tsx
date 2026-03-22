'use client'

// ─── UmbroViewer ──────────────────────────────────────────────────────────────
// R3F v8 + drei v9 + three 0.170 (React 18 kompatibel)
// ─────────────────────────────────────────────────────────────────────────────

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import type { Group } from 'three'

function UmbroModel() {
  const { scene } = useGLTF('/assets/3d/umbro.glb')
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.28
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.04
  })

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/assets/3d/umbro.glb')

export default function UmbroViewer() {
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden ring-1 ring-[#C9A84C]/20"
      style={{ height: 'clamp(220px, 30vw, 340px)' }}
    >
      {/* Lade-Dots (hinter Canvas, werden von Canvas überdeckt sobald geladen) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 2.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} color="#D4AF5B" />
        <directionalLight position={[3, 5, 3]}   intensity={1.4} color="#FFE8A0" />
        <directionalLight position={[-2, -2, -2]} intensity={0.3} color="#8B6914" />
        <directionalLight position={[0, 1, -4]}   intensity={0.5} color="#C9A84C" />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <UmbroModel />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.6}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
