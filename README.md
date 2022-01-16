# React Scroll Parallax

[![NPM Version Latest](https://badge.fury.io/js/react-scroll-parallax.svg)](https://www.npmjs.com/package/react-scroll-parallax)
[![NPM Downloads](https://img.shields.io/npm/dm/react-scroll-parallax)](https://www.npmjs.com/package/react-scroll-parallax)
[![Codecov](https://codecov.io/gh/jscottsmith/react-scroll-parallax/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-scroll-parallax)

[![Test and Lint](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/main.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/main.yml)
[![Storybook](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/surge.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/surge.yml)
[![Storybook](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/coverage.yml/badge.svg)](https://github.com/jscottsmith/react-scroll-parallax/actions/workflows/coverage.yml)

React hooks and components to create parallax scroll effects for banners, images or any other DOM elements. Utilizes [Parallax Controller](https://github.com/jscottsmith/parallax-controller) to add vertical or horizontal scrolling based effects to elements. [Optimized](https://parallax-controller.vercel.app/docs/performance) to _reduce_ jank on scroll and works with SSR and SSG rendered React apps.

If you're coming from [V2](https://github.com/jscottsmith/react-scroll-parallax/tree/v2.4.2), here's a [migration guide](https://github.com/jscottsmith/react-scroll-parallax/blob/master/docs/migration-guide.md).

## Examples

#### V3 Storybook

See the [Storybook](https://react-scroll-parallax-v3.surge.sh) for example usage of each component

- [Storybook](https://react-scroll-parallax-v3.surge.sh) - [Source](/stories)

#### Demos

Some demo websites using Parallax components

- [Demo 1](https://jscottsmith.github.io/react-scroll-parallax-examples/examples/parallax-example/) - [Source](https://github.com/jscottsmith/react-scroll-parallax-examples)
- [Demo 2](https://react-scroll-parallax.netlify.com/) - [Source](https://github.com/jscottsmith/react-parallax-site)

## Install

With npm

```
npm i react-scroll-parallax --save
```

or yarn

```
yarn add react-scroll-parallax
```

## Documentation

- [Example Usage](#usage)
- [Optimizations to Reduce Jank](#optimizations-to-reduce-jank)

### Docs: Components

- [`<Parallax>`](/docs/parallax-component.md)
- [`<ParallaxBanner>`](/docs/parallax-banner-component.md)
- [`<ParallaxProvider>`](/docs/parallax-provider-component.md)

### Docs: Hooks

- [`useParallax()`](/docs/use-parallax-hook.md)
- [`useController()`](/#todo)
- [`useParallaxImage`](/#todo)

## Usage

### First: Wrap with a ParallaxProvider

The [`<ParallaxProvider>`](#parallaxprovider) must wrap the component tree that contains all `<Parallax>` components. This should be a top level component like `<App>`. For example:

```jsx
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  render() {
    return (
      <ParallaxProvider>
        <AppRoutes />
      </ParallaxProvider>
    );
  }
}
```

### Then: Create effects with useParallax()

Then import the `useParallax` hook and use it anywhere within the provider. Here's an example that uses the `speed` prop so simply speed up (or slowdown) the rate of scroll.

```jsx
import { useParallax } from 'react-scroll-parallax';

const Component = () => {
  const { ref } = useParallax({ speed: 10 });
  return <div ref={ref} className="my-thing" />;
};
```

### Or: Create effects with \<Parallax>

You can also use the `Parallax` component. Here's an example that will transform the element on the `translateY` axis starting at `-20%` and ending at `20%` (`translateY = [-20, 20]` \*percent is assumed with no provided unit).

```jsx
import { Parallax } from 'react-scroll-parallax';

const Component = () => (
  <Parallax translateY={[-20, 20]}>
    <div className="my-thing" />
  </Parallax>
);
```

Example with transforms on the `translateX` axis starting at `-100px` and ending at `200px` (`translateX = ['-100px', '200px']`).

```jsx
import { Parallax } from 'react-scroll-parallax';

const Component = () => (
  <Parallax translateX={['-100px', '200px']}>
    <div className="my-thing" />
  </Parallax>
);
```

## How it works

TODO: **Explain how and when effects are applied** with some illustrations and demos.

1. This lib was first designed to be used on elements that scroll naturally with the page. If you use `fixed` positioning you will likely want to set the `startScroll` and `endScroll` values manually, or use a `targetElement` to indicate scroll progress.
2. Scroll state and positions of elements on the page are cached for performance reasons. This means that if the page height changes (most likely from [images loading](#example-usage-of-context)) after components mount the controller won't properly determine when the elements are in view. To correct this you can call the `parallaxController.update()` method from any child component of the `<ParallaxProvider />` via context. More details on how here: [Parallax Controller Context](#parallax-controller-context).

## Troubleshooting

If you're encountering issues like the parallax element jumping around or becoming stuck, there's a few likely culprits. Since this lib caches important positioning states it's possible for these to be outdated and incorrect. The most likely cause for this type of problem is the result of images loading and increasing the height of an element and/or the page. This can be fixed easily by [updating the cache](#example-usage-of-context).

## Optimizations to Reduce Jank

Considerations have been taken to reduce jank -- [please read more here](https://parallax-controller.vercel.app/docs/performance) on how this is done
