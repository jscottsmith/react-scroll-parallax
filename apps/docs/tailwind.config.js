module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      spacing: {
        '2xs': '0.125rem',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        '5xl': '8rem',
        '6xl': '10rem',
        '7xl': '12rem',
        '8xl': '14rem',
        '10xl': '16rem',
        '11xl': '18rem',
        '12xl': '20rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
};
