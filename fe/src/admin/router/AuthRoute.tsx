import React, { useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { isLogin } from '@utils/auth'

export const RouterBeforeEach = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  const ifLogin = isLogin()

  if (location.pathname == '/login') {
    if (ifLogin) {
      return <Navigate to="/admin" />
    } else {
      return <>{children}</>
    }
  } else if (location.pathname !== '/register') {
    if (!ifLogin) {
      return <Navigate to="/login" />
    } else if (ifLogin) {
      return <>{children}</>
    }
  } else {
    return <>{children}</>
  }
}
