import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, RouteObject, useRoutes } from 'react-router-dom'

const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Login/Register'))
const Admin = lazy(() => import('../pages/Admin'))

export type RoutesItems = {
  path: string
  element: React.ReactElement
  children?: RoutesItems[]
}
const config: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/admin" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]

const Routes = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}>
          <Spin size="large" />
        </div>
      }>
      {useRoutes(config)}
    </Suspense>
  )
}

export default Routes
