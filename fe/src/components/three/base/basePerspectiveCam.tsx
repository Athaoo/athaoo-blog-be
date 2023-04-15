import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei'
import { PerspectiveCameraProps } from '@react-three/fiber'
import { XyzArr } from '@src/types/three'
import React, { useEffect, useRef, useState } from 'react'
import { CameraHelper, type PerspectiveCamera as PerspectiveCameraType } from 'three'
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib'
import { useBaseOrbitCtrols } from './baseOrbitCtrl'

export const usePerspectiveCamRef = () => {
  const perspectiveCamRef = useRef<PerspectiveCameraType>()
  return perspectiveCamRef
}

export type basePerspectiveCameraType = {
  initialPosition?: XyzArr
  initialLookAt?: XyzArr
  initialFov?: number
  initialNear?: number
  initialFar?: number
}

export const useBasePerspectiveCamera = ({
  initialPosition = [0, 0, 10] as XyzArr,
  initialLookAt = [0, 0, 0] as XyzArr,
  initialFov = 75,
  initialNear = 0.1,
  initialFar = 1000,
}: basePerspectiveCameraType = {}) => {
  const [position, setPosition] = useState(initialPosition)
  const [lookAt, setLookAt] = useState(initialLookAt)
  const [fov, setFov] = useState(initialFov)
  const [near, setNear] = useState(initialNear)
  const [far, setFar] = useState(initialFar)
  const cameraRef = useRef<PerspectiveCameraType>()

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...position)
      cameraRef.current.lookAt(...lookAt)
      cameraRef.current.fov = fov
      cameraRef.current.near = near
      cameraRef.current.far = far
      cameraRef.current.updateProjectionMatrix()
    }
  }, [position, near, far, fov, lookAt])

  const BasePerspectiveCam = () => (
    <>
      ()
      <PerspectiveCamera makeDefault ref={cameraRef} position={position} near={near} far={far} />
    </>
  )

  return {
    BasePerspectiveCam,
    cameraRef,
    position,
    setPosition,
    near,
    setNear,
    far,
    setFar,
    fov,
    setFov,
    lookAt,
    setLookAt,
  }
}
