// routes.ts
import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { RouteObject, useRoutes, Navigate, Outlet } from 'react-router-dom'

const ArticlePage = lazy(() => import('@src/containers/articlePage'))
const ArtPage = lazy(() => import('@src/containers/artPage'))
const SceneContainer = lazy(() => import('@src/containers/arts/scenes3d'))
const ArticleList = lazy(() => import('@src/containers/articlePage/list'))
const ArticleDetail = lazy(() => import('@src/containers/articlePage/detail'))
const MyEditor = lazy(() => import('@src/containers/arts/markdown'))
const RotateBox = lazy(() => import('@src/containers/arts/scenes3d/rotateBox'))
const RotateBox2 = lazy(() => import('@src/containers/arts/scenes3d/rotateBox2'))
const Pcd1 = lazy(() => import('@src/containers/arts/scenes3d/pcd1'))
const Hooks1 = lazy(() => import('@src/containers/arts/reactTest/hooks1'))
const TestHooks2 = lazy(() => import('@src/containers/arts/reactTest/testHooks2'))

export type RoutesItems = {
  path: string
  element: React.ReactElement
  children?: RoutesItems[]
}

const config: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/article" />,
  },
  {
    path: '/article',
    element: <ArticlePage />,
    children: [
      {
        path: '',
        element: <ArticleList />,
      },
      {
        path: ':id',
        element: <ArticleDetail />,
      },
    ],
  },
  {
    path: '/art',
    element: <ArtPage />,
    children: [
      {
        path: '',
        element: <Navigate to="3d" />,
      },
      {
        path: '3d',
        element: <SceneContainer />,
        children: [
          {
            path: '',
            element: <Navigate to="rotateBox" />,
          },
          {
            path: 'rotateBox',
            element: <RotateBox />,
          },
          {
            path: 'rotateBox2',
            element: <RotateBox2 />,
          },
          {
            path: 'pcd1',
            element: <Pcd1 />,
          },
        ],
      },
      {
        path: 'react',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <MyEditor />,
          },
          {
            path: 'markdown',
            element: <MyEditor />,
          },
          {
            path: 'hooks1',
            element: <Hooks1 />,
          },
          {
            path: 'testHooks2',
            element: <TestHooks2 />,
          },
        ],
      },
    ],
  },
]

const RouterRoot = () => {
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

export { RouterRoot, config }
