// Global type declarations
declare global {
  const global: any;
}

// CSS module declarations
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Import jest-dom types (works with Vitest)
import '@testing-library/jest-dom';
