<div align="center">
  <img  height="200"
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png">
  <h1>react-docgen-typescript-plugin</h1>
  <p>A webpack plugin to inject react typescript docgen information</p>
</div>

## Install

```sh
npm install --save-dev react-docgen-typescript-plugin
# or
yarn add -D react-docgen-typescript-plugin
```

## Usage

> NOTE: The TypeScript compiler options `allowSyntheticDefaultImports` and `esModuleInterop` will make
> `react-docgen-typescript-plugin` a lot harder! Turn them off for faster build times.

```ts
const ts = require('typescript');
const ReactDocgenTypescriptPlugin = require("react-docgen-typescript-plugin").default;

module.exports = {
  plugins: [
    // Will default to loading your root tsconfig.json
    new ReactDocgenTypescriptPlugin(),
    // or with a specific tsconfig
    new ReactDocgenTypescriptPlugin({ tsconfigPath: "./tsconfig.dev.json" }),
    // or with compiler options
    new ReactDocgenTypescriptPlugin({ compilerOptions: { jsx: ts.JsxEmit.Preserve } }),
  ],
};
```

### Options

This plugins support all parser options from [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript#parseroptions) and all of the following options

| Option               | Type           | Description                                                                                                                                         | Default                   |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| tsconfigPath         | string         | Specify the location of the `tsconfig.json` to use.                                                                                                 | `null`                    |
| compilerOptions      | object         | Specify compiler options. Cannot be used with `tsconfigPath`                                                                                        | `null`                    |
| docgenCollectionName | string or null | Specify the docgen collection name to use. All docgen information will be collected into this global object. Set to `null` to disable.              | `STORYBOOK_REACT_CLASSES` |
| setDisplayName       | boolean        | Set the components' display name. If you want to set display names yourself or are using another plugin to do this, you should disable this option. | `true`                    |
| typePropName         | string         | Specify the name of the property for docgen info prop type.                                                                                         | `type`                    |
| exclude              | glob[]         | Glob patterns to ignore and not generate docgen information for. (Great for ignoring large icon libraries)                                          | `[]`                        |
| include              | glob[]         | Glob patterns to generate docgen information for                                                                                                    | `['**/**.tsx']`             |

## Debugging

If you want to see how this plugins is including and excluding modules set the `DEBUG` environment variable.

- `DEBUG=docgen:*` - All logs
- `DEBUG=docgen:include` - Included modules
- `DEBUG=docgen:exclude` - Excluded modules
- `DEBUG=docgen:docs` - Generated docs

```bash
DEBUG=docgen:* npm run storybook
```

> Another great way of debugging your generated docs is to use a `debugger` statement in your component source file.
> If you turn off source maps you will be able to see the code that this package generates.

## Prior Art

- [sn-client](https://github.com/SenseNet/sn-client/) - Inspired by this custom webpack plugin
- [react-docgen-typescript-loader](https://github.com/strothj/react-docgen-typescript-loader/) - Webpack loader to generate docgen information from Typescript React components.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://hipstersmoothie.com/"><img src="https://avatars3.githubusercontent.com/u/1192452?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Lisowski</b></sub></a><br /><a href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin/commits?author=hipstersmoothie" title="Code">💻</a> <a href="#design-hipstersmoothie" title="Design">🎨</a> <a href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin/commits?author=hipstersmoothie" title="Documentation">📖</a> <a href="#ideas-hipstersmoothie" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-hipstersmoothie" title="Maintenance">🚧</a> <a href="#infra-hipstersmoothie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin/commits?author=hipstersmoothie" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://shilman.net/"><img src="https://avatars2.githubusercontent.com/u/488689?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Shilman</b></sub></a><br /><a href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin/commits?author=shilman" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kherock"><img src="https://avatars.githubusercontent.com/u/4993980?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kyle Herock</b></sub></a><br /><a href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin/commits?author=kherock" title="Code">💻</a></td>
    <td align="center"><a href="https://survivejs.com/"><img src="https://avatars.githubusercontent.com/u/166921?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Juho Vepsäläinen</b></sub></a><br /><a href="#infra-bebraw" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin/commits?author=bebraw" title="Tests">⚠️</a> <a href="https://github.com/hipstersmoothie/react-docgen-typescript-plugin/commits?author=bebraw" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!