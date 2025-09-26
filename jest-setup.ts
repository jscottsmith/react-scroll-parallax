// Import jest-dom to extend expect matchers
import '@testing-library/jest-dom';

// Mock ResizeObserver for tests
(global as any).ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
