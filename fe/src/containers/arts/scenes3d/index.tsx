import React from 'react'
import { Outlet } from 'react-router-dom'

const SceneContainer = () => {
  const onContextMenu = (e) => {
    e.preventDefault()
  }
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onContextMenu={onContextMenu}>
      <Outlet />
    </div>
  )
}

export default SceneContainer
