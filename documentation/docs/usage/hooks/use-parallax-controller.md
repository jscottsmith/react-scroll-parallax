---
sidebar_position: 2
---

# useParallaxController

This hook provides you access to the [`ParallaxController`](https://parallax-controller.vercel.app/docs/api/parallax-controller/) via [React context](https://facebook.github.io/react/docs/context.html). The hook must be called in a component rendered within the [`<ParallaxProvider>`](/docs/usage/components/parallax-provider). The most common usage of the controller is to update cache if the page layout has changed.

```tsx
import { useParallaxController } from 'react-scroll-parallax';
```

## Examples

The following are some common scenarios that occur where you may need to access and update the controller.

### Usage For Images

Updating the `ParallaxController` cache once an image loads:

```tsx
function Image(props) {
  const parallaxController = useParallaxController();

  // updates cached values after image dimensions have loaded
  const handleLoad = () => parallaxController.update();

  return <img src={props.src} onLoad={handleLoad} />;
}
```

### Example Route Change Hook

Another common use case is the need to update cache after a route changes. This custom hook updates the controller each time the location changes.

```tsx
function useUpdateControllerOnRouteChange() {
  const location = useLocation();
  const parallaxController = useParallaxController();

  useEffect(() => {
    parallaxController.update();
  }, [location.pathname]);
}
```

### Parallax Controller

See the `parallax-controller` [documentation](https://parallax-controller.vercel.app/docs/api/parallax-controller/) of all the methods that can be called from the controller
