import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  server :{
    proxy: {
      '/api': "https://spoti-yt.vercel.app",
    }
  },
  plugins: [react(), svgr()],
})
