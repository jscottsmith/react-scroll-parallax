# Estree-to-babel [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/estree-to-babel.svg?style=flat&longCache=true
[BuildStatusURL]: https://github.com/coderaiser/estree-to-babel/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/estree-to-babel/workflows/Node%20CI/badge.svg
[DependencyStatusIMGURL]: https://img.shields.io/david/coderaiser/estree-to-babel.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/estree-to-babel "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/estree-to-babel "Build Status"
[DependencyStatusURL]: https://david-dm.org/coderaiser/estree-to-babel "Dependency Status"
[CoverageURL]: https://coveralls.io/github/coderaiser/estree-to-babel?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/estree-to-babel/badge.svg?branch=master&service=github

Convert [estree](https://github.com/estree/estree) compatible `JavaScript AST` to `babel AST`.

To use parsers like:

- [acorn](https://github.com/acornjs/acorn)
- [cherow](https://github.com/cherow/cherow)
- [espree](https://github.com/eslint/espree)
- etc...

With `babel` tools like:

- [@babel/traverse](https://babeljs.io/docs/en/babel-traverse)
- [@babel/types](https://babeljs.io/docs/en/babel-types)
- etc...

The thing is `@babel/parser` has a [little differences](https://babeljs.io/docs/en/babel-parser#output) with `estree` standard:

- `Property` of `ObjectExpression` called `ObjectProperty`;
- `FunctionExpression` of a `Property` located in `ObjectMethod` node;
- `File` node;
- `StringLiteral`, `NumericLiteral`, `NullLiteral`, `RegExpLiteral`, `BooleanLiteral` instead of `Literal`;
- `ClassMethod` instead of `MethodDefinition`;
- `ClassPrivateMethod`;
- `ClassPrivateName` stores name as `Identifier` in `id` field;
- `ClassPrivateProperty` instead of `FieldDefinition`;
- etc...

`estree-to-babel` aims to smooth this differences.

## Install

```
npm i estree-to-babel
```

### Example

```js
const cherow = require('cherow');
const toBabel = require('estree-to-babel');
const traverse = require('@babel/traverse').default;

const ast = toBabel(cherow.parse(`
    const f = ({a}) => a;
`));

traverse({
    ObjectProperty(path) {
        console.log(path.value.name);
        // output
        'a';
    },
});
```

## License

MIT
