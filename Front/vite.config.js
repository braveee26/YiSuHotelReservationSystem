import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
// Removed vite-tsconfig-paths since we're converting to JS
export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
});