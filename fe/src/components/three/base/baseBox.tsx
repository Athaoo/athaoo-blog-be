import React, { useEffect, useState, useRef } from 'react'
import { XyzArr } from '@src/types/three'
import { useFrame } from '@react-three/fiber'

export type baseBoxType = {
  initialPosition?: XyzArr
  initialScale?: XyzArr
  initialRotation?: XyzArr
}
const useBaseBox = ({
  initialPosition = [0, 0, 0] as XyzArr,
  initialScale = [1, 1, 1] as XyzArr,
  initialRotation = [0, 0, 0] as XyzArr,
}: baseBoxType = {}) => {
  const [position, setPosition] = useState(initialPosition)
  const [scale, setScale] = useState(initialScale)
  const [rotation, setRotation] = useState(initialRotation)
  const boxRef = useRef<THREE.Mesh>()

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.position.set(...position)
      boxRef.current.scale.set(...scale)
      boxRef.current.rotation.set(...rotation)
    }
  }, [position, scale, rotation])

  const BaseBox = (props) => {
    return (
      <mesh ref={boxRef} position={position} scale={scale} rotation={rotation} {...props}></mesh>
    )
  }

  return {
    BaseBox,
    boxRef,
    position,
    setPosition,
    scale,
    setScale,
    rotation,
    setRotation,
  }
}

export default useBaseBox
