import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const { resolve } = path

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
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
        admin: resolve(__dirname, './src/admin/index.html'),
      },
    },
    outDir: resolve(__dirname, './dist'),
  },
  plugins: [react()],
  base: './',
  publicDir: resolve(__dirname, './public'),
})
