import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Użyj '/', jeśli hostujesz w głównym katalogu
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: 'src/main.tsx',
    },
  },
});
