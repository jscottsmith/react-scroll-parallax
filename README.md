# React Scroll Parallax v2

Provides a React component and single passive scroll listener to add **vertical** scrolling based effects to elements based on their position in the viewport. Works with universal (server-side rendered) React apps.

**NOTE** The v2 branch is a re-write of v1 to add new scroll features such as opacity, scale, and rotation in addition to translation. It also uses the new [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), which will be a more efficient way to determining when elements are within the viewport as compared to v1's implementation. Additionally, much of the state of v1's ParallaxController has been moved to focused React components with the hope that these components can also be used to create additional custom scroll effects. This also has the added benefit of being able to easily debug with React specific tooling to see the state of scroll effects in the browser.

For a stable version of this library [use v1](https://github.com/jscottsmith/react-scroll-parallax).

## Examples

@TODO

## Install

```
npm i react-scroll-parallax --save
```

This package also requires [support](https://caniuse.com/#search=IntersectionObserver) for the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Since this isn't supported in older browsers you will need to add a [polyfill](https://github.com/w3c/IntersectionObserver/tree/gh-pages/polyfill).

```
npm i intersection-observer --save
```

## Usage

### Overview

There are two main components to be utilized in this library:

1. `<ScrollProvider>`
    - Responsible for providing the current scroll position to all `<Parallax>` components via context.

2. `<Parallax>`
    - Handles updating the styles of a DOM element such as translations, scale, or opacity.

@TODO: Document any higher order components that can be used.

### How to

Wrap your component tree that will contain `<Parallax>` components with the `<ScrollProvider>`. Most commonly this will be at the root of your application.

```jsx
...
import { ScrollProvider } from 'react-scroll-parallax';

class App extends Component {
    render() {
        return (
            <ScrollProvider>
                <StuffWithParallax />
            </ScrollProvider>
        );
    }
}

```

Import the `<Parallax>` component...

```javascript
import { Parallax } from 'react-scroll-parallax';
```

... then use it like so:

```jsx
<Parallax
    @TODO: TBD...
>
    <img src="/image" />
</Parallax>
```

## Parallax Component Props

The following are all props that can be passed to the React `<Parallax />` component:

**`example`**

- type: `Boolean`
- default: `false`

@TODO: Document props of the `<Parallax>` component.

## Scroll Controller Context

@TODO: Document any public methods (if any) of the `scrollController` context.

## Optimizations to Reduce Jank

React Scroll Parallax uses a single [passive scroll listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners) (dependent on browser support) with the minimal amount of work done on the scroll event to prevent [jank](http://jankfree.org/) (calculations that cause layout, reflow and paint are cached initially and only updated when layout changes). All offsets are applied with 3D transforms to utilize the GPU and prevent paints. If you have ideas to further optimize scrolling please PR or post an issue.

**PSA**

It's 2017 and you probably shouldn't be building parallax sites—but if you do (like I did) and you use this package try and use it responsibly. Keeping images small and optimized, reducing the number of moving elements in view and on the page, and disabling scroll effects on mobile devices should help keep animations smooth.
