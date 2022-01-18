# ParallaxProvider

The `<ParallaxProvider />` component is meant to wrap a root level component in your application and is necessary to provide access through the React context API to the [Parallax Controller](https://parallax-controller.vercel.app/docs/intro).

## Basic Example

This component should only be used once in you app, for instance in an `<AppContainer />` component that won't be mounted/unmounted during route changes. Like so:

```tsx
import { ParallaxProvider } from 'react-scroll-parallax';

const AppContainer = () => (
  <ParallaxProvider>
    <Router>
      <App />
    </Router>
  </ParallaxProvider>
);
```

:::info

You can have multiple providers, however they will all be independent instances of a `ParallaxController`. It's recommended to only use one when possible.

:::

## ParallaxProvider Props

The following props configure the `<ParallaxProvider>` component:

| Name                |     Type      | Default    | Description                                                                                                              |
| ------------------- | :-----------: | :--------- | ------------------------------------------------------------------------------------------------------------------------ |
| **scrollAxis**      |   `string`    | `vertical` | Optionally pass the scroll axis for setting horizontal/vertical scrolling. One of `vertical` or `horizontal`             |
| **scrollContainer** | `HTMLElement` | `<body>`   | Optionally set the container that has overflow and will contain parallax elements. Defaults to the document scroll body. |

## Example: Scroll Container

By default the <ParallaxProvider\> defaults to the document scrolling element. If your app's overflow is a unique element you need to provide the element as the `scrollContainer`. Here's how:

```tsx
import * as React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

const ScrollContainer = () => {
  const [scrollEl, setScrollElement] = React.useState(null);
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
