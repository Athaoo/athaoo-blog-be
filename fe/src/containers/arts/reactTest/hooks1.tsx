import React, { useEffect } from 'react'

import { Card, Col, Menu, MenuProps, Row, theme } from 'antd'

const App = () => {
  useEffect(() => {
    console.log(`🚀 -> file: hooks1.tsx:9 -> useEffect -> 123:`, 123)
  }, [])

  return <Card>123</Card>
}

export default App
