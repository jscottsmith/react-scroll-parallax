import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: ['src/**/*.d.ts', 'src/index.ts', 'src/testUtils/**'],
    },
    include: ['src/**/*.{test,spec}.ts'],
    exclude: ['node_modules', 'dist'],
  },
});
