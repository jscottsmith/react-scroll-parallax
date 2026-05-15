---
sidebar_position: 2
---

# Advanced Usage

There are a few ways to change how the scroll progress of an element is calculated.

## Setting Scroll Top Values

You can set `startScroll` and `startScroll` representing the `scrollTop` values to animate between.

```ts
const props = { startScroll: 0, endScroll: 1000 };

controller.createElement({
  el: document.querySelector('.your-element'),
  props,
});
```

## Using a Target Element

A different element can also be used to track scroll progress. Assign a `targetElement` when creating a new parallax element.

```ts
const props = { targetElement: document.getElementById('target') };

controller.createElement({
  el: document.querySelector('.your-element'),
  props,
});
```
