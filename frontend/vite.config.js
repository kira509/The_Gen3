import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',               // Ensures proper routing in deployed app
  build: {
    outDir: 'dist'         // Output folder for Render static deploy
  },
  server: {
    fs: {
      strict: false
    }
  }
})
