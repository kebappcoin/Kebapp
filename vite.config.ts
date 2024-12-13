import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Kebapp/',  // Must match your repository name exactly
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});