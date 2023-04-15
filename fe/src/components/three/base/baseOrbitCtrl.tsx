import React, { Ref, useRef, useState } from 'react'
import { TransformControls, OrbitControls, OrbitControlsProps } from '@react-three/drei'
import { OrbitControls as ThreeOrbitControls } from 'three-stdlib'

export const useBaseOrbitCtrols = () => {
  const orbitRef = useRef<ThreeOrbitControls>()
  const [enabled, setEnabled] = useState(true)

  const toggleEnabled = () => {
    setEnabled(!enabled)
  }

  const OrbitCtrl = (props) => {
    return <OrbitControls {...props} ref={orbitRef} enabled={enabled} />
  }

  return { OrbitCtrl, orbitRef, enabled, toggleEnabled }
}

export default { useBaseOrbitCtrols }
