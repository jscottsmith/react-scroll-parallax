# Development

Scripts and procedures for developing locally.

## Getting started

Install node modules

```
yarn install
```

Start storybook

```
yarn start
```

## Testing

Run Jest tests

```
yarn test
```

or in watch mode

```
yarn test:watch
```

## Linting and Prettier

Run prettier on source files

```
yarn prettier
```

Lint files with eslint

```
yarn lint
```

## Publishing New Version to NPM

Bump the version with npm to commit package.json update and tag release.

```
npm version 2.0.0-beta.0
```

Add any additional tags to npm if applicable

```
npm dist-tag add react-scroll-parallax@2.0.0-beta.0 next
```

Publish to npm

```
npm publish --tag beta
```
