import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // This Vite proxy forwards all /api requests from
  // the frontend to http://localhost:3000,
  // avoiding CORS issues during development.
  server: {
    proxy: {
      '/api': { 
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
