# \<ParallaxBanner>

Component that utilizes `<Parallax>` components to achieve a parallaxing banner effect. Allows a single or multiple images to be parallaxed at different rates within the banner area.

## Banner Usage

Use the `layers` prop to indicate all images, offset amounts, and scroll rates. Optionally pass additional children to be rendered. Styles of the outermost banner element can also be changed. Here's an example:

```jsx
<ParallaxBanner
  className="your-class"
  layers={[
    {
      image: 'https://foo.com/foo.jpg',
      amount: 0.1,
    },
    {
      image: 'https://foo.com/bar.png',
      amount: 0.2,
    },
  ]}
  style={{
    height: '500px',
  }}
>
  <h1>Banner Children</h1>
</ParallaxBanner>
```

## Banner Props

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
| **amount**   |    `number`    |         | A value from `-1` to `1` that represents the vertical offset to be applied to the current layer, `0.1` would equal a `10%` offset on the top and bottom. |
| **children** | `ReactElement` |         | Custom layer children provided as a React element, for example `<Video />`                                                                               |
| **expanded** |   `boolean`    | `true`  | Indicate if the layer should be expanded with negative top/bottom margins so the edges will never be visible.                                            |
| **image**    |    `string`    |         | Image source that will be applied as a CSS background image on the layer.                                                                                |
| **props**    |    `object`    |         | Props to apply to the layer element. Example: `{ props: style: { background: 'red' }}`                                                                   |
