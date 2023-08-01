import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, RouteObject, useRoutes } from 'react-router-dom'
import { RouterBeforeEach } from './AuthRoute'

const Login = lazy(() => import('../pages/Login'))
const Admin = lazy(() => import('../pages/Admin'))
const ArticleList = lazy(() => import('../pages/Article/list'))
const AddArticle = lazy(() => import('../pages/Article/AddArticle'))
const EditArticle = lazy(() => import('../pages/Article/EditArticle'))

export const lazySuspense = (component: React.ReactElement) => {
  return (
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
      {component}
    </Suspense>
  )
}

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
    element: lazySuspense(<Login />),
  },
  /**出于安全 不再需要注册admin */
  // {
  //   path: '/register',
  //   element: lazySuspense(<Register />),
  // },
  {
    path: '/admin',
    element: lazySuspense(<Admin />),
    children: [
      {
        path: 'article',
        element: lazySuspense(<Outlet />),
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
    route.element = <RouterBeforeEach>{route.element}</RouterBeforeEach>

    if (route instanceof Array && route.length) {
      route.children = createRoutes(route.children)
    }

    return route
  })
}
const myRoutes = createRoutes(config)

const Routes = () => useRoutes(myRoutes)

export default Routes
