---
sidebar_position: 1
---

# Basic Usage

Create the parallax controller first:

```ts
const controller = ParallaxController.init();
```

Then create an element with [animation effects](./props) as props:

```ts
controller.createElement({
  el: document.querySelector('.your-element'),
  props: {
    translateY: [-100, 100],
    opacity: [0.4, 1],
  },
});
```

```html
<div class="your-element">
  <!-- children  -->
</div>
```
