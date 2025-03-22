import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 🔹 Muy importante si no usas rutas absolutas
  build: {
    outDir: 'dist'
  }
})
