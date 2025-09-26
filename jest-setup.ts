// Import jest-dom to extend expect matchers
import '@testing-library/jest-dom';

// Mock ResizeObserver for tests
declare const global: any;
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
