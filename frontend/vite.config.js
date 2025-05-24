import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react()],
  server: {
    cors: false,
    proxy: {
      '/api': {
        target: 'https://vinstonsalim.site',
        changeOrigin: true,

        secure: false,
        ws: true,
      },
      '/socket.io': {
        target: 'https://vinstonsalim.site',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/server-config.js': {
        target: 'https://vinstonsalim.site',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'static/[name]-[hash][extname]',

        chunkFileNames: 'static/[name]-[hash].js',

        entryFileNames: 'static/[name]-[hash].js',
      },
    },
  },
});
