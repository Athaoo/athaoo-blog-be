import React, { useEffect } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { isLogin } from '../utils/auth'

export const RouterBeforeEach = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(`🚀 -> file: AuthRoute.tsx:7 -> RouterBeforeEach -> pathname`, location.pathname)

  const ifLogin = isLogin()

  if (location.pathname == '/login') {
    if (ifLogin) {
      return <Navigate to="/admin" />
    } else {
      return <>{children}</>
    }
  } else {
    if (!ifLogin) {
      return <Navigate to="/login" />
    } else if (ifLogin) {
      return <>{children}</>
    }
  }
}
