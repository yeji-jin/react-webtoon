// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "styled-components": path.resolve(__dirname, "node_modules/styled-components"),
    },
  },
  build: {
    rollupOptions: {
      external: ["swiper/css"],
    },
  },
});
