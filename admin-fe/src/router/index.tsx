import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, RouteObject, useRoutes } from 'react-router-dom'

const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Login/Register'))
const Admin = lazy(() => import('../pages/Admin'))
const ArticleList = lazy(() => import('../pages/Article/list'))
const AddArticle = lazy(() => import('../pages/Article/AddArticle'))
const EditArticle = lazy(() => import('../pages/Article/EditArticle'))
const TestApi = lazy(() => import('../pages/Article/TestApi'))

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
    children: [
      {
        path: 'article',
        element: <Outlet />,
        children: [
          {
            path: '*',
            element: <ArticleList />,
          },
          {
            path: 'add',
            element: <AddArticle />,
          },
          {
            path: 'list',
            element: <ArticleList />,
          },
          {
            path: 'edit/:id',
            element: <EditArticle />,
          },
          {
            path: 'testApi',
            element: <TestApi />,
          },
        ],
      },
    ],
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
