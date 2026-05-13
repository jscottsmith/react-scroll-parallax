import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  deps: {
    neverBundle: ['react', 'react-dom'],
  },
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
});
