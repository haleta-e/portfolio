import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcssPlugin from '@tailwindcss/vite';

const tailwindcss = typeof tailwindcssPlugin === 'function' ? tailwindcssPlugin : (tailwindcssPlugin as any).default || tailwindcssPlugin;

export default defineConfig({
  base: './',
  plugins: [react(), typeof tailwindcss === 'function' ? tailwindcss() : null].filter(Boolean),
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    allowedHosts: true,
    hmr: false,
  },
});

