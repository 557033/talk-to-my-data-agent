import path from "path";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config: UserConfig = {
    base: "./",
    plugins: [
      react(),
      tailwindcss(),
      nodePolyfills({
        exclude: [],
        // for plotly.js
        protocolImports: true,
      }),
    ],
    envDir: '../../',
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };

  // Add optimizations for production builds
  if (command === 'build') {
    config.build = {
      outDir: '../deploy/dist',
      emptyOutDir: true,
      // Exclude test files from the build
      rollupOptions: {
        external: [
          // Exclude test setup files
          /setupTests\.(cjs|js|ts)/,
          // Exclude test files and mocks
          /__tests__\//,
          /__mocks__\//,
          /\.test\.(js|ts|jsx|tsx)$/,
          /\.spec\.(js|ts|jsx|tsx)$/,
          /jest\.config\.cjs$/,
        ],
      },
    };
  }

  return config;
});
