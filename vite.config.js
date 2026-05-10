import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

const appUrl = new URL(process.env.APP_URL ?? 'http://127.0.0.1.nip.io:8000')
const devServerHost = appUrl.hostname
const devServerOrigin = `${appUrl.protocol}//${devServerHost}:5173`
const tenantOriginPattern = /^https?:\/\/(?:[^:/]+\.)*127\.0\.0\.1\.nip\.io(?::\d+)?$/

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
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: {
      origin: [tenantOriginPattern],
    },
    allowedHosts: ['.127.0.0.1.nip.io'],
    origin: devServerOrigin,
    hmr: {
      host: devServerHost,
      protocol: 'ws',
      clientPort: 5173,
    },
  },
})
