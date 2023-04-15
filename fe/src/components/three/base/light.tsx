import React from 'react'

export const BaseAmbientPointLight = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}

export default BaseAmbientPointLight
