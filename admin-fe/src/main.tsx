import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme, App as AntdApp } from 'antd'
import { useTheme } from './theme'
import { magenta } from '@ant-design/colors'
import { ThemeProvider } from './theme'
import MyApp from './pages/App'
import './index.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const Root: React.FC = () => {
  const myTheme = useTheme()
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: magenta[6],
        },
        algorithm: myTheme.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
      <MyApp/>
    </ConfigProvider>
  )
}

root.render(
  <ThemeProvider>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </ThemeProvider>
)
