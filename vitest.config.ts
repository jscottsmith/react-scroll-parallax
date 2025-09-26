import { defineConfig } from 'vitest/config';

export default defineConfig({
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
        'stories/',
        'documentation/',
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
