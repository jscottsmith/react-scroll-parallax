---
sidebar_position: 1
---

# useParallax

Main hook for applying parallax effects to a DOM element. Any of the documented [effects and configurations](/docs/usage/parallax-props) can be passed as params to the hook.

```tsx
import { useParallax } from 'react-scroll-parallax';
```

## Example

To use the hook assign the `ref` returned to the element that you would like to apply effects to. Then provide the hook with the [prop configuration](/docs/usage/parallax-props) for the effects you need.

```tsx
function Component() {
  const { ref } = useParallax<HTMLDivElement>({ speed: 10 });
  return <div ref={ref} />;
}
```

### Returned Values

The `useParallax()` hook returns the following:

| Name           | Description                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **ref**        | `ref` that must be assigned to a DOM element                                                                               |
| **controller** | The [`ParallaxController`](https://parallax-controller.vercel.app/docs/api/parallax-controller/) instance.                 |
| **element**    | The `Element` created by the [`ParallaxController`](https://parallax-controller.vercel.app/docs/api/parallax-controller/). |
