<a href="https://react-scroll-parallax.damnthat.tv/"><img src="https://react-scroll-parallax.damnthat.tv/img/logo.png" style="width:96px;height:auto;"></a>

# React Scroll Parallax

[![NPM Version Latest](https://img.shields.io/npm/v/react-scroll-parallax/latest)](https://www.npmjs.com/package/react-scroll-parallax)
[![NPM Downloads](https://img.shields.io/npm/dm/react-scroll-parallax)](https://www.npmjs.com/package/react-scroll-parallax)
[![Codecov](https://codecov.io/gh/jscottsmith/react-scroll-parallax/branch/v3/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-scroll-parallax)
[![Rate on Openbase](https://badges.openbase.com/js/rating/react-scroll-parallax.svg)](https://openbase.com/js/react-scroll-parallax?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

[![Test and Lint](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/main.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/main.yml)
[![Storybook](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/surge.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/surge.yml)
[![Storybook](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/coverage.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/coverage.yml)

React hooks and components to create parallax scroll effects for banners, images or any other DOM elements. Utilizes [Parallax Controller](https://parallax-controller.v1.damnthat.tv) to add vertical or horizontal scrolling based effects to elements. [Optimized](https://parallax-controller.v1.damnthat.tv/docs/performance) to _reduce_ jank on scroll and works with SSR and SSG rendered React apps.

If you're coming from [V2](https://github.com/jscottsmith/react-scroll-parallax/tree/v2), here's a [migration guide](https://react-scroll-parallax.damnthat.tv/docs/migration-guides/v2-migration-guide).

## Install

With npm

```
npm install react-scroll-parallax
```

or yarn

```
yarn add react-scroll-parallax
```

## Example

[Create effects](https://react-scroll-parallax.damnthat.tv/docs/examples/how-it-works) with a hook:

```jsx
function Component() {
  const parallax = useParallax({
    speed: -10,
  });
  return <div ref={parallax.ref} />;
}
```

or with a component:

```jsx
function Component() {
  return (
    <Parallax speed={-10}>
      <div />
    </Parallax>
  );
}
```

## Getting Started

Read the [documentation](https://react-scroll-parallax.damnthat.tv/) for setup and usage instructions.

- [Usage](https://react-scroll-parallax.damnthat.tv/docs/usage/)
- [How it works](https://react-scroll-parallax.damnthat.tv/docs/examples/how-it-works)

### Demos

- [Storybook v3](https://react-scroll-parallax-v3.surge.sh/) - [Source Code](https://github.com/jscottsmith/react-scroll-parallax/tree/v3/stories)
- [Demo 1](https://react-scroll-parallax-examples.vercel.app/) - [Source Code](https://github.com/jscottsmith/react-scroll-parallax-examples)
- [Demo 2](https://react-scroll-parallax.netlify.app/) - [Source Code (old 2.x version)](https://github.com/jscottsmith/react-parallax-site)

### Docs: Hooks

- [`useParallax()`](https://react-scroll-parallax.damnthat.tv/docs/usage/hooks/use-parallax)
- [`useParallaxController()`](https://react-scroll-parallax.damnthat.tv/docs/usage/hooks/use-parallax-controller)

### Docs: Components

- [`<Parallax>`](https://react-scroll-parallax.damnthat.tv/docs/usage/components/parallax-component)
- [`<ParallaxBanner>`](https://react-scroll-parallax.damnthat.tv/docs/usage/components/parallax-banner-component)
- [`<ParallaxProvider>`](https://react-scroll-parallax.damnthat.tv/docs/usage/components/parallax-provider)
