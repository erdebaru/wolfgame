import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
})
