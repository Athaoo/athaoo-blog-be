import { lazySuspense } from '@src/router/inedx'
import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom'

const SceneContainer = () => {
  const onContextMenu = (e) => {
    e.preventDefault()
  }
  // const sPO = useMemo(() => lazySuspense(<Outlet />), [])
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onContextMenu={onContextMenu}>
      {lazySuspense(<Outlet />)}
      {/* {sPO} */}
    </div>
  )
}

export default SceneContainer
