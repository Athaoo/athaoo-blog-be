import React from 'react'
import { Outlet } from 'react-router-dom'
import { theme, Row, Col } from 'antd'
import { lazySuspense } from '@src/router/inedx'

const { useToken } = theme
const ArticlePage = () => {
  const { token } = useToken()

  return (
    <Row
      style={{
        padding: '24px 50px',
        height: '100%',
        background: token.colorBgContainer,
      }}>
      <Col span={4}></Col>
      <Col span={18}>{lazySuspense(<Outlet />)}</Col>
      <Col span={2}></Col>
    </Row>
  )
}

export default ArticlePage
