export default {
  entry: 'src/index.ts',
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom'],
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
};
