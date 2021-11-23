# Parallax Controller Context

Access the controller via [React context](https://facebook.github.io/react/docs/context.html) in any components rendered within a `<ParallaxProvider>`.

This is accessible by using `useController()` [React hook](https://reactjs.org/docs/hooks-intro.html) in components without writing a class or wrapping them in HOC.

```jsx
import { useController } from 'react-scroll-parallax';

const MyComponent = () => {
  const parallaxController = useController();

  // do stuff with `parallaxController`
  return <div />;
};
```

### Available Methods

Access the following methods on `parallaxController` via context:

**`update()`**

Updates all cached attributes for parallax elements then updates their positions.

**`destroy()`**

Removes window scroll and resize listeners then resets all styles applied to parallax elements.

### Example usage of context

The most common use case that would require access to the controller is dealing with images. Since the controller caches attributes for performance they will need to be updated with the correct values once the image loads. Here's an example of how you could do that with an `<Image />` component:

```jsx
import { useController } from 'react-scroll-parallax';

function Image(props) {
  const parallaxController = useController();

  // updates cached values after image dimensions have loaded
  const handleLoad = () => parallaxController.update();

  return <img src={props.src} onLoad={handleLoad} />;
}
```

If your parallax components are stuck and acting weird, this is most likely due to the fact that your page initial scroll was not at the top on load. Here's a possible solution to this problem using `useController()` hook. It can be used in your application top level component or specifically in the part of your application where you are experiencing problems.

```jsx
const ParallaxCache = () => {
  const parallaxController = useController();

  useLayoutEffect(() => {
    const handler = () => parallaxController.update();
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  }, [parallaxController]);

  return null;
};

// <ParallaxCache /> now can be used anywhere you have problems with cached attributes
```
