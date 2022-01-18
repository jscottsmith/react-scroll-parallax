---
sidebar_position: 1
---

# V2 Migration Guide

With mostly just new features, V3 also makes a few breaking changes. See the following and migrate any code that is affected.

### Prop changes for <Parallax\>

If you've used any of the following props rename to new ones, or refactor if they are no longer supported.

1. `styleOuter` becomes `style`.
2. `tagOuter` becomes `tag`.
3. `x` becomes `translateX`.
4. `y` becomes `translateY`.
5. `styleInner` is no longer supported - There's only a single element returned by the component.
6. `tagInner` is no longer supported - There's only a single element returned by the component.

### Using the useController hook.

1. The hook `useController` has been renamed to `useParallaxController`.
2. The hook returns the instance of the controller directly.

If you used the following:

```js
const { parallaxController } = useController();
```

change it to:

```js
const parallaxController = useParallaxController();
```

### Removed default class names

If you relied on either the `parallax-outer` or `parallax-inner` class names for styling you will need to refactor or set them manually.