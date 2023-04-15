import React, { useState } from 'react'
import { Space, Button } from 'antd'
import { BulbOutlined } from '@ant-design/icons'
import { useTheme } from '@src/theme'

const ThemeToggler: React.FC = () => {
  const { toggleTheme } = useTheme()

  return (
    <Space>
      <Button shape="circle" onClick={toggleTheme} icon={<BulbOutlined />}></Button>
    </Space>
  )
}

export default ThemeToggler
