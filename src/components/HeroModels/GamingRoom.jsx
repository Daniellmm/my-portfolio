/*
Model: "Isometric Gaming Room" by robbyrefta (https://sketchfab.com/robbyrefta)
Source: https://sketchfab.com/3d-models/isometric-gaming-room-acb7828967a541348a645800ff1c2a9b
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/) — credited in Footer.jsx
Generated via gltfjsx, transformed/compressed to public/models/isometric-gaming-room-transformed.glb
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function GamingRoom({ onScreenClick, onScreenHoverChange, ...props }) {
  const { nodes, materials } = useGLTF('/models/isometric-gaming-room-transformed.glb')

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
          onScreenHoverChange?.(true)
          window.dispatchEvent(new CustomEvent('dch:cursor', { detail: { state: 'hover' } }))
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onScreenHoverChange?.(false)
          window.dispatchEvent(new CustomEvent('dch:cursor', { detail: { state: 'canvas' } }))
        }}
      />
    </group>
  )
}

useGLTF.preload('/models/isometric-gaming-room-transformed.glb')
