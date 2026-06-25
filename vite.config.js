import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/',

  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'FlashCards/assets/*',     dest: 'FlashCards/assets' },
        { src: 'MetroAnimation/assets/*', dest: 'MetroAnimation/assets' },
      ]
    })
  ],

  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        root:              resolve(__dirname, 'index.html'),
        settings:          resolve(__dirname, 'settings.html'),
        userGuide:         resolve(__dirname, 'user-guide.html'),
        termsAndPrivacy:   resolve(__dirname, 'terms-and-privacy.html'),
        flashcardsIndex:   resolve(__dirname, 'FlashCards/index.html'),
        flashcards:        resolve(__dirname, 'FlashCards/flashcards.html'),
        metroAnimation:    resolve(__dirname, 'MetroAnimation/index.html'),
        metroLineSelector: resolve(__dirname, 'MetroLineSelector/index.html'),
        progressDashboard: resolve(__dirname, 'ProgressDashboard/index.html'),
      },
    },
  },

  server: {
    port: 5173,
  },
});
