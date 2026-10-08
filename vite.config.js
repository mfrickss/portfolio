import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
  build: {
    outDir: "docs",
    assetsDir: "assets",
    sourcemap: false,
  },
});
