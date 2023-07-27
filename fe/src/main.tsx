import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '@src/containers/home/app'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@src/theme'
import { ConfigProvider, theme } from 'antd'
import { magenta } from '@ant-design/colors'
import { useTheme } from './theme/index'
import store from '@src/store'
import { Provider as ReduxProvider } from 'react-redux'
import '@src/styles/main.css'
import '@src/styles/tailwind.css'

const container = document.getElementById('root')
const root = createRoot(container)

const Root: React.FC = () => {
  const myTheme = useTheme()
  return (
    <ReduxProvider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: magenta[6],
          },
          algorithm: myTheme.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}>
        <App />
      </ConfigProvider>
    </ReduxProvider>
  )
}

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </BrowserRouter>
)
