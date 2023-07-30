import React from 'react'
import { Space, Button, Tooltip } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

const onclick = () => {
  const githubUrl = 'https://github.com/Athaoo'
  window.open(githubUrl, '_blank')
}

const ThemeToggler: React.FC = () => {
  return (
    <Space>
      <Tooltip title="github">
        <Button shape="circle" onClick={onclick} icon={<GithubOutlined />}></Button>
      </Tooltip>
    </Space>
  )
}

export default ThemeToggler
