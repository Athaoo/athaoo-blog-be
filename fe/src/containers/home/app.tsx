import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Layout, Row, Col, App as AntdApp } from 'antd'
import { theme } from 'antd'

import { RouterRoot } from '@src/router/inedx'
import MyHeader from '../topMenu'

import { useScrollNearBottom } from '@src/utils/useScrollToBottom'

import './styles/index.scss'
import '@src/styles/tailwind.css'

const { Footer } = Layout
const { useToken } = theme
const App: React.FC = () => {
  const { token } = useToken()
  const scrollContainerRef = useRef(null)

  return (
    <Row className="transition duration-300 overflow-x-hidden h-full w-full">
      <Col ref={scrollContainerRef} className="w-full h-full overflow-y-auto" span={24}>
        <MyHeader defaultSelectedKey={''}></MyHeader>
        <main
          className="overflow-x-hidden overflow-y-visible h-fit"
          style={{ background: token.colorBgContainer, minHeight: 'calc(100% - 64px)' }}>
          <div>
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
