import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

const { resolve } = path

dotenv.config()

export default defineConfig({
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './src/api'),
      '@utils': resolve(__dirname, './src/utils'),
      '@containers': resolve(__dirname, './src/containers'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
      },
    },
    outDir: resolve(__dirname, './dist/blog'),
  },
  plugins: [react()],
  publicDir: resolve(__dirname, './public/blog'),
})