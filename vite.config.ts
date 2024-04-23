import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Ustawienie bazy na '/' jest idealne, jeśli hostujesz aplikację w głównym katalogu
  base: '/',
  plugins: [react()],
  build: {
    manifest: true, // Włączenie manifestu zasobów, co jest pomocne przy cache'owaniu
    // Opcje Rollup mogą być potrzebne do specyfikacji, gdy masz skomplikowaną strukturę projektu
    // lub chcesz dodać dodatkowe pliki do kompilacji
    rollupOptions: {
      // input: 'src/main.tsx', // Ścieżka do głównego pliku wejściowego aplikacji, zakomentowana dla ułatwienia
    },
  },
});
