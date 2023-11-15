import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/shuttles/',
  server: {
    host: true,
    port: 8080
  }
})
