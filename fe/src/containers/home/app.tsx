import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Layout, Row, Col, App as AntdApp } from 'antd'
import { theme } from 'antd'

import { RouterRoot } from '@src/router/inedx'
import MyHeader from '../topMenu'

import './styles/index.scss'
import '@src/styles/tailwind.css'

const { Footer } = Layout
const { useToken } = theme
const App: React.FC = () => {
  const { token } = useToken()

  return (
    <Row className="transition duration-300 overflow-x-hidden h-full w-full">
      <Col className="flex flex-col w-full h-full" span={24}>
        <MyHeader defaultSelectedKey={''}></MyHeader>
        <main
          className="overflow-x-hidden flex flex-col flex-1"
          style={{ background: token.colorBgContainer }}>
          <div className="flex1">
            <RouterRoot></RouterRoot>
          </div>
          <Footer style={{ background: token.colorBgContainer, textAlign: 'center' }}>
            Athaoo 2023
          </Footer>
        </main>
      </Col>
    </Row>
  )
}

export default App
