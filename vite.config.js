// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puedes usar el puerto que desees para el frontend
    proxy: {
      // Redirige las peticiones que empiezan con /api a tu servidor de Node.js
      '/api': {
        target: 'http://localhost:3000', // La URL de tu API
        changeOrigin: true,
      }
    }
  }
})