/*
Model: "Isometric Gaming Room" by robbyrefta (https://sketchfab.com/robbyrefta)
Source: https://sketchfab.com/3d-models/isometric-gaming-room-acb7828967a541348a645800ff1c2a9b
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/) — credited in Footer.jsx
Generated via gltfjsx, transformed/compressed to public/models/isometric-gaming-room-transformed.glb
*/

import React, { useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'

export function GamingRoom({ onScreenClick, ...props }) {
  const { nodes, materials } = useGLTF('/models/isometric-gaming-room-transformed.glb')
  const [screenHovered, setScreenHovered] = useState(false)

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube_0.geometry} material={materials.mat_lowpoly} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.201]} />
      <mesh geometry={nodes.Cube032_0.geometry} material={materials.mat_lowpoly} position={[0.225, 0.564, -0.747]} rotation={[-Math.PI / 2, 0, 0.288]} scale={[0.072, 0.035, 0.008]} />
      <mesh
        geometry={nodes.Plane001_0.geometry}
        material={materials.material}
        position={[0.366, 0.649, -2.817]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onScreenClick?.()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setScreenHovered(true)
          window.dispatchEvent(new CustomEvent('dch:cursor', { detail: { state: 'hover' } }))
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setScreenHovered(false)
          window.dispatchEvent(new CustomEvent('dch:cursor', { detail: { state: 'canvas' } }))
        }}
      >
        {screenHovered && (
          <Html center distanceFactor={6} position={[0, 0, 0.1]}>
            <span className='px-3 py-1.5 rounded-full bg-black-100/90 border border-white/10 text-white-50 text-xs font-mono whitespace-nowrap pointer-events-none'>
              View Projects →
            </span>
          </Html>
        )}
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/isometric-gaming-room-transformed.glb')
