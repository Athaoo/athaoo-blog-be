import React, { useEffect } from 'react'
import { Menu, MenuProps, Space, theme, Row, Col, Typography } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggler from './ThemeToggler'
import GithubBtn from './Github'
import '@src/styles/tailwind.css'

const MenuRouteName = [
  {
    route: 'article',
    label: '奥利安费',
  },
  {
    route: 'art',
    label: '阿米诺手',
  },
]
const { useToken } = theme
const { Title } = Typography
const MenuLabel: React.FC = (route: string, label: string) => {
  return (
    <div style={{ fontSize: '18px' }}>
      <Link to={route}></Link>
      {label}
    </div>
  )
}

const MenuItems: MenuProps['items'] = MenuRouteName.map(({ route, label }) => {
  return { key: route, label: MenuLabel(route, label) }
})

type HeaderProps = {
  defaultSelectedKey: string
}
const MyHeader: React.FC<HeaderProps> = ({ defaultSelectedKey }) => {
  const { token } = useToken()

  const MenuClass = {
    justifyContent: 'center',
    padding: '0',
    height: '100%',
    background: 'transparent',
    border: 'none',
  }
  return (
    <Header
      className="header sticky top-0 pd-0 z-10 drop-shadow-sm"
      style={{ background: token.colorBgContainer }}>
      <div className="flex flex-row justify-between h-full w-full">
        <Menu
          style={MenuClass}
          className="flex-1"
          mode="horizontal"
          defaultSelectedKeys={[defaultSelectedKey]}
          items={MenuItems}></Menu>
        <div className="absolute right-0 h-full w-36 ">
          <Space>
            <ThemeToggler />
            <GithubBtn />
          </Space>
        </div>
      </div>
    </Header>
  )
}

export default MyHeader
