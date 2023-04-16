import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { theme } from 'antd'
import { useTheme } from './theme'
import { magenta } from '@ant-design/colors'
import { ThemeProvider } from './theme'
import App from './pages/App'
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
      <App />
    </ConfigProvider>
  )
}

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
