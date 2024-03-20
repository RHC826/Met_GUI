import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base:"/Met_front/",
  build: { outDir: 'docs' },
});
