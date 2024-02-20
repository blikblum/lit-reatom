import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'demo',
  test: {
    environment: 'jsdom',
  },
})
