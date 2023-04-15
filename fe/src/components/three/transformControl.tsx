import React, { useRef } from 'react'
import { TransformControls as DreiTransformControls } from '@react-three/drei'

const TransformControls = ({ children, ...props }) => {
  const transformControlsRef = useRef()

  return (
    <>
      <DreiTransformControls ref={transformControlsRef} {...props}>
        {children}
      </DreiTransformControls>
    </>
  )
}

export default TransformControls
