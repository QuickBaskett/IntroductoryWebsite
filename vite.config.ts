import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // relative base so the built site works at the domain root and under a
  // subpath (GitHub Pages project site) alike
  base: './',
  plugins: [react(), tailwindcss()],
})
