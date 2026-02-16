import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
          @use "sass:color";
          @use "sass:math";
          @use "/src/styles/variables" as *;
        `
      }
    }
  }
})
