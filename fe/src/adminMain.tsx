import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme } from 'antd'
import { magenta } from '@ant-design/colors'
import { ThemeProvider, useTheme } from '@src/theme'
import MyApp from './admin/pages/App'
import '@src/admin/style/index.css'

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
      <MyApp />
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
