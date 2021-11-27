# React Scroll Parallax

[![npm version](https://badge.fury.io/js/react-scroll-parallax.svg)](https://badge.fury.io/js/react-scroll-parallax) [![Build Status](https://travis-ci.org/jscottsmith/react-scroll-parallax.svg?branch=master)](https://travis-ci.org/jscottsmith/react-scroll-parallax) [![codecov](https://codecov.io/gh/jscottsmith/react-scroll-parallax/branch/master/graph/badge.svg)](https://codecov.io/gh/jscottsmith/react-scroll-parallax)

React components to create parallax scroll effects for banners, images or any other DOM elements. Uses a single scroll listener via [Parallax Controller](https://github.com/jscottsmith/parallax-controller) to add vertical or horizontal scrolling based offsets to elements based on their position in the viewport. [Optimized](https://github.com/jscottsmith/parallax-controller#optimizations-to-reduce-jank) to _reduce_ jank on scroll and works with universal (server-side rendered) React apps.

If you're coming from [v1](https://github.com/jscottsmith/react-scroll-parallax/tree/v1), here's a [migration guide](https://github.com/jscottsmith/react-scroll-parallax/blob/master/docs/migration-guide.md).

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

## Overview

- [Usage](#usage)
- [`<Parallax>`](/docs/parallax-component.md)
  - [Parallax Props](/docs/parallax-component.md#parallax-props)
- [`<ParallaxBanner>`](/docs/parallax-banner-component.md)
  - [Banner Usage](/docs/parallax-banner-component.md#banner-usage)
  - [Banner Props](/docs/parallax-banner-component.md#banner-props)
  - [Banner Layers Prop](/docs/parallax-banner-component.md#banner-layers-prop)
- [`<ParallaxProvider>`](/docs/parallax-provider-component.md)
  - [ParallaxProvider Props](/docs/parallax-provider-component.md#parallaxprovider-props)
- [Parallax Controller Context](/docs/parallax-controller-context.md)
  - [Available Methods](/docs/parallax-controller-context.md#available-methods)
- [Browser Support](#browser-support)
- [Optimizations to Reduce Jank](#optimizations-to-reduce-jank)
  - [PSA](#psa)

## Example Usage

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

Then import the `Parallax` component and use it anywhere within the provider. Here's an example that will transform the element on the `translateY` axis starting at `-20%` and ending at `20%` (`translateY = [-20, 20]` \*percent is assumed with no provided unit).

```jsx
import { Parallax } from 'react-scroll-parallax';

const VerticalParallax = () => (
  <Parallax translateY={[-20, 20]}>
    <div className="my-thing" />
  </Parallax>
);
```

Example with transforms on the `translateX` axis starting at `-100px` and ending at `200px` (`translateX = ['-100px', '200px']`).

```jsx
import { Parallax } from 'react-scroll-parallax';

const HorizontalParallax = () => (
  <Parallax translateX={['-100px', '200px']}>
    <div className="my-thing" />
  </Parallax>
);
```

## How it works

TODO: **Explain how and when effects are applied** with some illustrations and demos.

**Warnings:**

1. This lib was designed to be used on `relative` or `absolute` positioned elements that scroll naturally with the page. If you use `fixed` positioning on either the element itself or the parent you will encounter issues. More on that in [troubleshooting](#troubleshooting).
2. Scroll state and positions of elements on the page are cached for performance reasons. This means that if the page height changes (most likely from [images loading](#example-usage-of-context)) after `<Parallax />` components are mounted the controller won't properly determine when the elements are in view. To correct this you can call the `parallaxController.update()` method from any child component of the `<ParallaxProvider />` via context and the `withController()` HOC. More details on how here: [Parallax Controller Context](#parallax-controller-context).

## Troubleshooting

If you're encountering issues like the parallax element jumping around or becoming stuck, there's a few likely culprits. Since this lib caches important positioning states it's possible for these to be outdated and incorrect. The most likely cause for this type of problem is the result of images loading and increasing the height of an element and/or the page. This can be fixed easily by [updating the cache](#example-usage-of-context). Another likely issue is the CSS positioning applied to the parent or parallax element itself is `fixed`. Fixed positioning parallax elements is currently not supported and may appear to work in some cases but break in others. Avoid using `position: fixed` and instead use `static`, `relative` or `absolute`, which this lib was designed to support. If none of these are relevant and you still have trouble please post an issue with your code or a demo that reproduces the problem.

## Browser Support

React scroll parallax should support the last two versions of all major browsers and has been tested on desktop Chrome, Firefox, Safari, Edge and IE11, as well as the following for mobile: iOS 9, iOS 10, Android 4. While this lib may work on mobile browsers I do not recommend it in most cases for UX reasons. If you encounter any errors for browsers that should be supported please post an issue.

## Optimizations to Reduce Jank

Considerations to have been taken to reduce jank -- [please read more here](https://github.com/jscottsmith/parallax-controller#optimizations-to-reduce-jank) on how this is done

### **PSA**

Even with optimizations _scroll effects can cause jank_. It's also important to keep in mind that scroll effects are usually not critical to a users experience and sometimes can be annoying.

If you use these components make sure you seriously consider the following:

- Keep images small (do not use inappropriately high resolutions) and optimized (use appropriate compression)
- Reduce the number of scroll effects on elements in view and on the page in total
- Disable the use — or limit the amount — of scroll effects for users on mobile devices

Follow the above and you should keep scrolling smooth and users happy.
