# Creating An Instance

Use the `ParallaxController.init()` method to instantiate a new controller tied to a view element. By default one will be created for `vertical` scrolling tied to the `body` scroll element.

```ts
const instance = ParallaxController.init();
```

### With Options

You can pass options to the `init()` method options that will change the default axis and provide a different scrolling element.

```ts
const scrollContainer = document.getElementById('your-scroll-container');
const instance = ParallaxController.init({
  scrollAxis: 'horizontal',
  scrollContainer,
});
```

### Init Options

The following option can be passed to `ParallaxController.init(...)`.

| Option            |   Default    | Description                                                                |
| ----------------- | :----------: | -------------------------------------------------------------------------- |
| `scrollAxis`      | `'vertical'` | Direction of scroll for the element. One of `'vertical'` or `'horizontal'` |
| `disabled`        |    false     | Initial disabled state of the Parallax Controller                          |
| `scrollContainer` |   `window`   | HTMLElement that will contain scroll elements.                             |
