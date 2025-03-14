import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    port: 5173,  // Change from 5173 to 5174
    strictPort: true,  // Avoid auto-changing port
    open: true,
  },
})
