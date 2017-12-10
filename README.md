# React Scroll Parallax v2

A small library of components for creating **vertical** scroll based effects like parallax based on an element's position in the viewport. Works with universal (server-side rendered) React apps.

### Optimizations

Scroll effects can cause lots of [jank](http://jankfree.org/). The following optimizations _attempt to limit_ this jank:

- Using a single passive scroll listener and single resize listener for all elements
- Only updates elements when they are within the viewport
- Determines visibility of elements with the browser's asynchronous [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- Caching expensive calls like `getBoundingClient` that cause paints, reflow and layout
- Applying effects as 3D transforms to utilize the GPU and prevent re-paints

### Supported Effects

The following are supported effects

- **Translate X** 
- **Translate Y**
- **Scale**
- **Opacity** 

## Examples

[Storybook Demos](http://react-scroll-parallax.surge.sh/)

## Install

**Warning:** This is currently a prerelease. For a stable version of this library [use v1](https://github.com/jscottsmith/react-scroll-parallax).

```
npm i react-scroll-parallax@next --save
```

This package also requires [support](https://caniuse.com/#search=IntersectionObserver) for the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Since this isn't supported in older browsers you will need to add a [polyfill](https://github.com/w3c/IntersectionObserver/tree/gh-pages/polyfill).

```
npm i intersection-observer --save
```

## Usage

### Overview

There are two main components to be utilized in this library:

1. `<ParallaxProvider>`
    - Responsible for providing access to the scroll and resize controllers to all `<Parallax>` components via context.

2. `<Parallax>`
    - Handles updating the styles of a DOM element such as x and y translations, scale, or opacity.

@TODO: Document other internal components that can be used.

### Example usage

Wrap your app that will contain `<Parallax>` components with the `<ParallaxProvider>` which will provide the necessary`context` to child components.

```jsx
import { ParallaxProvider } from 'react-scroll-parallax';

const Root = () => (
    <ParallaxProvider>
        <App />
    </ParallaxProvider>
);
```

Import `<Parallax>` then add some props and give it some children to render.

```jsx
import { Parallax } from 'react-scroll-parallax';

<Parallax
    x={['-50%', '75%']}
    y={['-100px', '100px']}
    scale={[0.5, 1.5]}
    opacity={[1, 0]}
    className="foo"
>
    <div className="bar" />
</Parallax>
```

### <Parallax> Props

The following are all props that can be passed to the React `<Parallax />` component. 

For effect props such as `x`, `y`, `scale`, and `opacity` an `Array` with two elements must be provided. This represents the start and end values of the effect.

|Name                  |Type    |Description
|----------------------|:-------|:----------------------------------------
|**x**                 |`Array` |`translateX` offsets, first value is the starting position, second is the ending position. Accepts units of `px` or `%`. Integers without units default to `px`.
|**y**                 |`Array` |`translateY` offsets, first value is the starting position, second is the ending position. Accepts units of `px` or `%`. Integers without units default to `px`.
|**scale**             |`Array` |`scale` effect, first value is the starting scale, second is the ending scale. Only accepts positive integers.
|**opacity**           |`Array` |`opacity` effect, first value is the starting opacity, second is the ending opacity. Only accepts integers between 0–1.
|**className**         |`String`|`class` to be applied to the outermost `<div>`.
|**observerOptions**   |`Object`|[options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) given to the Intersection Observer contructor.








