import { useRoutes, Outlet } from 'react-router-dom'
import React from 'react'
import {
  HomePage,
  MenuPage,
  SiderPage,
  SubMenuPage,
  SubSiderPage,
  ItemDetailsPage,
} from '@src/containers/routerTest'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'menu/:menuId',
      element: <MenuPage />,
      children: [
        {
          path: '',
          element: <SiderPage />,
        },
        {
          path: 'sub/:subMenuId',
          element: <SubMenuPage />,
          children: [
            {
              path: '',
              element: <SubSiderPage />,
            },
            {
              path: ':itemId',
              element: <ItemDetailsPage />,
            },
          ],
        },
      ],
    },
  ])

  return (
    <>
      {routes}
      <Outlet />
    </>
  )
}

export default App
