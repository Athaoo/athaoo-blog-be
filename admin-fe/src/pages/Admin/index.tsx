import React from 'react'
import { Menu, Breadcrumb, Row, Col, App, MenuProps } from 'antd'
import { ThunderboltOutlined, UserOutlined } from '@ant-design/icons'
import { Link, Outlet } from 'react-router-dom'

const { SubMenu } = Menu

type page = {
  id: string
  path: string
  name: string
}

const subArticleRoutes: page[] = [
  {
    id: '1',
    path: '/admin/article/list',
    name: '文章列表',
  },
  {
    id: '2',
    path: '/admin/article/add',
    name: '添加文章',
  },
  {
    id: '3',
    path: '/admin/article/testApi',
    name: '测试接口',
  },
]

const sideMenuItems: MenuProps['items'] = [
  {
    key: 'articleList',
    icon: React.createElement(ThunderboltOutlined),
    label: '文章管理',
    children: subArticleRoutes.map((subRoute, j) => {
      const { id, path, name } = subRoute
      return {
        key: `article-${id}`,
        label: <Link to={path}>{name}</Link>,
      }
    }),
  },
]

const Admin: React.FC = () => {
  return (
    <Row style={{ height: '100%', width: '100%' }}>
      <Row style={{ height: '64px', width: '100%' }}>
        <Col span={24}>
          <div>我是Header</div>
        </Col>
      </Row>
      <Row style={{ height: 'calc(100% - 64px)', width: '100%' }}>
        <Col span={4}>
          <Menu
            mode="inline"
            defaultOpenKeys={['articleList']}
            defaultSelectedKeys={['articleList']}
            style={{ height: '100%', borderRight: 0 }}
            items={sideMenuItems}></Menu>
        </Col>
        <Col span={20} style={{ height: '100%' }}>
          <Outlet />
        </Col>
      </Row>
    </Row>
  )
}

export default Admin
