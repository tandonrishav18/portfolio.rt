import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'case-alias-plugin',
        closeBundle() {
          const distDir = path.resolve(__dirname, 'dist');
          if (!fs.existsSync(distDir)) return;
          const aliases: Record<string, string> = {
            'Moc.png': 'moc.png',
            'B11.png': 'b11.png',
            'B12.png': 'b12.png',
            'IMPA.PNG': 'impa.png',
            'Paper2.pdf': 'paper2.pdf',
          };
          for (const [target, source] of Object.entries(aliases)) {
            const srcPath = path.join(distDir, source);
            const dstPath = path.join(distDir, target);
            try {
              if (fs.existsSync(srcPath) && !fs.existsSync(dstPath)) {
                fs.copyFileSync(srcPath, dstPath);
              }
            } catch {
              // ignore on systems where files already alias
            }
          }
        },
      },
    ],
    assetsInclude: ['**/*.glb'],
    worker: {
      format: 'es' as const,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
