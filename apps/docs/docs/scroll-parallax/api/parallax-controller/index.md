# Parallax Controller Class

The main controller for setting up and managing a scroll view of parallax elements.

```ts
import { ParallaxController } from 'scroll-parallax';
```

## Creating a New Controller

```ts
const instance = ParallaxController.init();
```

See the options for creating a new controller tied to a view: [`ParallaxController.init`](./init)

## Instance Methods

- [`createElement()`](./methods#createelement)
- [`getElements()`](./methods#getelements)
- [`updateElementPropsById()`](./methods#updateelementpropsbyid)
- [`removeElementById()`](./methods#removeelementbyid)
- [`resetElementStyles()`](./methods#resetelementstyles)
- [`updateScrollContainer()`](./methods#updatescrollcontainer)
- [`disableParallaxController()`](./methods#disableparallaxcontroller)
- [`enableParallaxController()`](./methods#enableparallaxcontroller)
- [`update()`](./methods#update)
- [`destroy()`](./methods#destroy)
