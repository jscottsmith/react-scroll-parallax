---
sidebar_position: 2
---

# ParallaxProvider

The `<ParallaxProvider />` component is meant to wrap a root level component in your application and is necessary to provide access through the React context API to the [Parallax Controller](https://parallax-controller.vercel.app/docs/intro).

```tsx
import { ParallaxProvider } from 'react-scroll-parallax';
```

## Examples

This component should only be used once in your app, for instance in an `<AppContainer />` component that won't be mounted/unmounted during route changes. Like so:

```tsx
const AppContainer = () => (
  <ParallaxProvider>
    <Router>
      <App />
    </Router>
  </ParallaxProvider>
);
```

:::info

You can have multiple providers, however they will all be independent instances of a [`ParallaxController`](https://parallax-controller.damnthat.tv/docs/api/parallax-controller/). It's recommended to only use one when possible.

:::

## Props

The following props configure the `<ParallaxProvider>` component:

| Name                |     Type      | Default    | Description                                                                                                              |
| ------------------- | :-----------: | :--------- | ------------------------------------------------------------------------------------------------------------------------ |
| **scrollAxis**      |   `string`    | `vertical` | Optionally pass the scroll axis for setting horizontal/vertical scrolling. One of `vertical` or `horizontal`             |
| **scrollContainer** | `HTMLElement` | `<body>`   | Optionally set the container that has overflow and will contain parallax elements. Defaults to the document scroll body. |
| **isDisabled**      |   `boolean`   | `false`    | Disables the ParallaxController and all animations.                                                                      |

## More Examples

Using props you can configure the provider for the following conditions.

### Horizontal Scrolling

If your app's overflow is horizontal, you'll need to change the `scrollAxis`:

```tsx
const AppContainer = () => (
  <ParallaxProvider scrollAxis="horizontal">
    <Router>
      <App />
    </Router>
  </ParallaxProvider>
);
```

### Scroll Container

By default the `<ParallaxProvider>` uses the document scrolling element. If your app's overflow is a unique element you need to provide the element as the `scrollContainer`.

Here's how you can do that using React hooks to set a `ref` to a DOM element. The `useEffect` will be called once after mounting then update state with the element to be passed to the provider.

```tsx title="ScrollContainer.tsx"
import * as React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

const ScrollContainer = () => {
  const [scrollEl, setScrollElement] = React.useState<HTMLDivElement>(null);
  const ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    setScrollElement(ref.current);
  });

  return (
    <div className="your-scroll-container" ref={ref}>
      <ParallaxProvider scrollContainer={scrollEl}>
        {props.children}
      </ParallaxProvider>
    </div>
  );
};
```

### Disabling All Parallax Elements

With the `isDisabled` prop you may disable every parallax element in the provider when a condition is met, instead of individually. This can be helpful to disable parallax in certain situations like on mobile devices, or for users who [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). Elements will be re-enabled when `isDisabled` is `true`.

```tsx
const App = () => {
  const userPrefersReducedMotion = useMediaQuery({
    query: '(prefers-reduced-motion)',
  });

  return (
    <ParallaxProvider isDisabled={userPrefersReducedMotion}>
      {props.children}
    </ParallaxProvider>
  );
};
```
