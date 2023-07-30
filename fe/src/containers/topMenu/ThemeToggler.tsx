import React, { useState } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { BulbOutlined } from '@ant-design/icons'
import { useTheme } from '@src/theme'

const GithubBtn: React.FC = () => {
  const { toggleTheme } = useTheme()

  return (
    <Space>
      <Tooltip title="明暗切换">
        <Button shape="circle" onClick={toggleTheme} icon={<BulbOutlined />}></Button>
      </Tooltip>
    </Space>
  )
}

export default GithubBtn
