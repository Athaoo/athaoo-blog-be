import React, { useRef, useState } from 'react'
import { TransformControls } from '@react-three/drei'

const useBaseTransformControls = () => {
  const tfRef = useRef<typeof TransformControls>()
  const [enabled, setEnabled] = useState(true)

  const toggleTfEnabled = () => {
    setEnabled(!enabled)
  }
  const TfCtrl = ({ children, ...props }) => {
    return (
      <TransformControls {...props} enabled={enabled}>
        {children}
      </TransformControls>
    )
  }

  return { TfCtrl, tfRef, enabled, toggleTfEnabled }
}

export default useBaseTransformControls
