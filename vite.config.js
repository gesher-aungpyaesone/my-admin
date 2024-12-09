import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@provider': path.resolve('src/provider'),
      '@component': path.resolve('src/component'),
      // Add more aliases if needed
    },
  },
});
