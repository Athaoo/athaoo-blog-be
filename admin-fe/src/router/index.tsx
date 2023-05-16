import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, RouteObject, useRoutes } from 'react-router-dom'
import { RouterBeforeEach } from './AuthRoute'

const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Login/register'))
const Admin = lazy(() => import('../pages/Admin'))
const ArticleList = lazy(() => import('../pages/Article/list'))
const AddArticle = lazy(() => import('../pages/Article/AddArticle'))
const EditArticle = lazy(() => import('../pages/Article/EditArticle'))

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
        ],
      },
    ],
  },
]

const createRoutes = (routes: RouteObject[]) => {
  return routes.map((route) => {
    route.element = (
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spin size="default" />
          </div>
        }>
        <RouterBeforeEach>{route.element}</RouterBeforeEach>
        {/* {route.element} */}
      </Suspense>
    )

    if (route instanceof Array && route.length) {
      route.children = createRoutes(route.children)
    }

    return route
  })
}
const myRoutes = createRoutes(config)
console.log(`🚀 -> file: index.tsx:88 -> myRoutes:`, myRoutes)

const Routes = () => useRoutes(myRoutes)

export default Routes
