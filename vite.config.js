import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/React-todo-app/', // 👈 your GitHub repo name
  plugins: [
    react(),
    tailwindcss(),
  ],
})