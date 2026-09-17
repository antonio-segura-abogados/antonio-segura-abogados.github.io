import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'incluir-licencia-tipografica',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'licencias/PlusJakartaSans-OFL.txt',
          source: readFileSync(
            new URL('../recursos-compartidos/assets/fuentes/OFL.txt', import.meta.url),
            'utf8',
          ),
        });
      },
    },
  ],
  // Recursos relativos: el mismo dist funciona en / y /nombre-repositorio/.
  // Las rutas de aplicación usan HashRouter, sin reescrituras del servidor.
  base: './',
  server: {
    fs: { allow: [fileURLToPath(new URL('..', import.meta.url))] },
  },
});
