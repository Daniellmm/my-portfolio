import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    modulePreload: {
      resolveDependencies: (filename, deps) => deps.filter((dep) => !dep.includes('vendor-three')),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/](three|@react-three)[\\/]/.test(id)) return 'vendor-three'
          if (/[\\/](gsap|@gsap|lenis)[\\/]/.test(id)) return 'vendor-animation'
          if (/[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'vendor-react'
        },
      },
    },
  },
})