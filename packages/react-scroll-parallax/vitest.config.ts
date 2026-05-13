import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      'scroll-parallax': path.resolve(__dirname, '../scroll-parallax/src/index.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'coverage/',
        'dist/',
        '../../apps/storybook/stories/',
        '../../apps/docs/',
        'storybook-static/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/setupTests.ts',
        '**/testUtils/**',
        '**/index.ts',
      ],
    },
  },
});
