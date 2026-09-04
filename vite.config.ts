import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/CSMBQ/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          ui: ['lucide-react', 'react-hot-toast'],
          store: ['zustand'],
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react'],
  },
})
