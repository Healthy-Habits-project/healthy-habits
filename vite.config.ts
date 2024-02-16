import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
  ],
  css: {
    // Ensure that 'postcss' is installed (npm install postcss)
    // and configured with any necessary plugins in a 'postcss.config.js' file
    postcss: {},
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
