import {defineConfig} from 'vite';
import path from 'path';
import inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    inspect(),
  ],
  build: {
    rollupOptions: {
      external: ['glob','fs'],
    },
    lib: {
      entry: path.resolve(__dirname, 'script/index.js'),
      name: "vitePluginDnsPrefetch",
      fileName: "main",
      formats: ["es", "cjs"]
    }
  }
})
