# ParallaxBanner

Component that utilizes `<Parallax>` components to achieve a parallaxing banner effect. Allows a single or multiple images to be parallaxed at different rates within the banner area.

## Basic Example

Use the `layers` to supply a `speed` and `image` to your banner. In this case, it will create a banner using a single image, that moves slower than the rate of scroll, and the edges of the image will never be visible.

```jsx
<ParallaxBanner
  layers={[
    {
      image: 'https://foo.com/foo.jpg',
      speed: -20,
    },
  ]}
  style={{
    height: '500px',
  }}
/>
```

:::caution

You **must** add a `height` value either as a `style` or through a `className` otherwise the banner will have no height and be hidden.

:::

## Multiple Layers

Supply the `layers` prop with additional configuration for more images. Each layer can contain unique configurations.

```jsx
<ParallaxBanner
  layers={[
    {
      image: 'https://foo.com/foo.jpg',
      speed: -20,
    },
    {
      image: 'https://foo.com/bar.png',
      speed: -10,
    },
  ]}
  style={{
    height: '500px',
  }}
/>
```

## Customized Layers

Supply the `layers` prop with [additional configuration](#banner-layers-prop) for more images. Each layer can contain unique configurations.

```jsx
<ParallaxBanner
  layers={[
    {
      image: 'https://foo.com/foo.jpg',
      speed: -20,
    },
    {
      children: <h1>My Headline</h1>,
      speed: -10,
    },
  ]}
  style={{
    height: '500px',
  }}
/>
```

## Props

The following are all props that can be passed to the `<ParallaxBanner>` component:

| Name          |   Type    | Default | Description                                                                                                                                |
| ------------- | :-------: | :------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **className** | `string`  |         | Optionally pass additional class names to be added to the outermost parallax banner element.                                               |
| **disabled**  | `boolean` | `false` | Determines if the internal parallax layers will have offsets applied.                                                                      |
| **layers**    |  `array`  |         | A required `array` of `objects` with layer properties: `[{ amount: 0.1, image: 'foo.jpg' }]`. [See layers prop below](#banner-layers-prop) |
| **style**     | `object`  |         | Optionally pass a style object to be added to the outermost parallax banner element.                                                       |

## Banner Layers Prop

The `layers` prop takes an array of objects that will represent each image (or custom children) of the parallax banner. The following properties describe a layer object:

| Name         |      Type      | Default | Description                                                                                                                                              |
| ------------ | :------------: | :------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **speed**    |    `number`    |         | A value from `-1` to `1` that represents the vertical offset to be applied to the current layer, `0.1` would equal a `10%` offset on the top and bottom. |
| **children** | `ReactElement` |         | Custom layer children provided as a React element, for example `<Video />`                                                                               |
| **expanded** |   `boolean`    | `true`  | Indicate if the layer should be expanded with negative top/bottom margins so the edges will never be visible.                                            |
| **image**    |    `string`    |         | Image source that will be applied as a CSS background image on the layer.                                                                                |
| **props**    |    `object`    |         | Props to apply to the layer element. Example: `{ props: style: { background: 'red' }}`                                                                   |
