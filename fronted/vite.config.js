import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
  proxy: {
    '/Auth/signup': 'http://localhost:3000',
    '/Auth/login': 'http://localhost:3000',
    '/Auth/forgot-password': 'http://localhost:3000',
    '/Auth/reset-password/:token': 'http://localhost:3000',
    '/dash/expenses': 'http://localhost:3000',
    '/dash/incomes': 'http://localhost:3000',
    '/dash/expense/:id': 'http://localhost:3000',
    '/dash/incomes/:id': 'http://localhost:3000',
  }
}
})
