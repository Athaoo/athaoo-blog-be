import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@containers': path.resolve(__dirname, './src/containers'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: './src/admin/main.tsx',
      },
    },
    outDir: 'dist/admin',
  },
  plugins: [react()],
  base: './',
  publicDir: './public/admin',
  root: path.resolve(__dirname, './public/admin'),
})
