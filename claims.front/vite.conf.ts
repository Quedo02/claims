import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Claims_v2/claims.front/', 
  plugins: [react()],
});

