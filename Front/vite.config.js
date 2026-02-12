import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
// Removed vite-tsconfig-paths since we're converting to JS
export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/hotel': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/room-type': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/hotel-image': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/hotel-attribute': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
});