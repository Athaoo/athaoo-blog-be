import React, { useEffect } from 'react'
import { Menu, MenuProps, Space, theme, Row, Col, Typography } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggler from './ThemeToggler'

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
    <Header className="header" style={{ padding: '0', background: token.colorBgContainer }}>
      <Row justify="space-between" style={{ height: '100%', width: '100%' }}>
        <Col span={6}></Col>
        <Col span={12} style={{ height: '100%' }}>
          <Menu
            style={MenuClass}
            mode="horizontal"
            defaultSelectedKeys={[defaultSelectedKey]}
            items={MenuItems}></Menu>
        </Col>
        <Col span={6}>
          <ThemeToggler></ThemeToggler>
        </Col>
      </Row>
    </Header>
  )
}

export default MyHeader
