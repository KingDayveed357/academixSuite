import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    tailwindcss(),
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,  
    }),
    react(),
    svgr(),
  ],
})
