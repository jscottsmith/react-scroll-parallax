const babel = require('rollup-plugin-babel')
const { titleCase } = require('title-case')
const packageJson = require('./package.json')

process.env.BABEL_ENV = 'production'

module.exports = {
  external: [
    'element-resize-detector',
    'invariant',
    'throttle-debounce',
    'prop-types',
    'react-dom',
    'react',
    'shallowequal',
  ],
  input: 'src/index.js',
  output: {
    file: `dist/${packageJson.name}.js`,
    format: 'cjs',
    sourcemap: true,
    name: titleCase(packageJson.name.replace(/-/g, ' ')).replace(/ /g, ''),
    exports: 'auto',
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-proposal-class-properties'],
    }),
  ],
}
