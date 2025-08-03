import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [crx({ manifest })],
  // ビルド時の出力先ディレクトリを 'dist' に設定
  build: {
    outDir: 'dist',
  },
});
