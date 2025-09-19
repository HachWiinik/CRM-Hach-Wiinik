import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fix: `__dirname` is not available in an ES module context.
      // The modern way to resolve paths in Node.js ESM is by using `import.meta.url`.
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
