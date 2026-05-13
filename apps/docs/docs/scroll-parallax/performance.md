---
sidebar_label: Performance
sidebar_position: 2
---

# Performance

Scroll effects can impact performance, however a number of techniques are used to keep scrolling performance optimized.

## Optimizations to Reduce Jank

1. Uses a single passive scroll listener to control all animated elements on the page.
2. A minimal amount of work is done on the scroll event with no calls to methods that cause layout shifts.
3. Calculations that cause layout, reflow ([`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)) are cached and only updated when layout may change.
4. A non-blocking [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is used to apply all scroll effects.
5. Only GPU supported CSS effects `transform` and `opacity` are allowed.
6. CSS [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) is added to an element based on animation effects to prevent paints.

If you have ideas to further optimize scrolling [please PR or post an issue](https://github.com/jscottsmith/parallax-controller).

## Scroll Effects May Still Cause Bad User Experiences!

**It's up to you to make sure you use this package appropriately.**

Here's some suggestions for usage while maintaining good UX:

1. Keep effects simple -- less is more. Oftentimes the less extreme animations on the page the better the scrolling will be.
2. Minimize the number of scroll effects on elements that are in view at the same time.
3. When using images keep them small and optimized. Hi-resolution images will hurt scroll performance.
4. Disable most (or all) scroll effects on mobile. Mobile devices optimize for best battery life and animation performance will often be degraded.
