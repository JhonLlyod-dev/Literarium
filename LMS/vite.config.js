import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  server: {
    port: 3001,
    host: true,
    proxy: {
      '/books': {
        target: 'http://localhost:8080/books',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/books/, ''),
      },
      '/borrow': {
        target: 'http://localhost:8080/borrowedBooks',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/borrow/, ''),
      },
    },
  },
})
