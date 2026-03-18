import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/**/*",
          dest: "assets",
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // Vite automatycznie znajdzie index.html w głównym folderze,
      // o ile nie nadpiszesz tego błędną ścieżką.
      input: "index.html",
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/index.css";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
