// Global type declarations
declare global {
  const global: any;
}

// Import jest-dom types
import '@testing-library/jest-dom';

// Extend Jest matchers
declare module '@jest/expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveClass(className: string): R;
    toHaveStyle(css: string | Record<string, any>): R;
  }
}
