import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useHelper, TransformControls } from '@react-three/drei'
import { PointLightHelper } from 'three'

const Mesh = () => {
  return <></>
}

const Lights = () => {
  const pointLightRef = useRef()

  useHelper(pointLightRef, PointLightHelper, 0.5, 'hotpink')

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight ref={pointLightRef} position={[10, 10, 10]} />
    </>
  )
}

const Scene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Lights />
      <Mesh />
    </Canvas>
  )
}

export default Scene
