import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置@别名
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
  server: {
    proxy: {
      '/githot': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/githot/, ''),
      },
    },
  },
})
