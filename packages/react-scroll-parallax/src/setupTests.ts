// Import jest-dom to extend expect matchers (works with Vitest)
import '@testing-library/jest-dom';

// Mock ResizeObserver for tests
declare const global: any;
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
