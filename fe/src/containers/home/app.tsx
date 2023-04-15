import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Layout, Row, Col, App as AntdApp } from 'antd'
import { theme } from 'antd'

import { RouterRoot } from '@src/router/inedx'
import MyHeader from '../topMenu'

import './styles/index.scss'

const { Footer } = Layout
const { useToken } = theme
const App: React.FC = () => {
  const { token } = useToken()

  return (
    <Row style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Col span={24} style={{ minHeight: '100vh' }}>
        <MyHeader defaultSelectedKey={''}></MyHeader>
        <main style={{ height: 'calc(100% - 64px)', background: token.colorBgContainer }}>
          <RouterRoot></RouterRoot>
        </main>
        <Footer style={{ background: token.colorBgContainer, textAlign: 'center' }}>
          Athaoo 2023
        </Footer>
      </Col>
    </Row>
  )
}

export default App
