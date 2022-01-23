import React, { useState } from 'react';
import mapValues from 'lodash/mapValues';
import { storiesOf } from '@storybook/react';
import { ArgsTable } from '@storybook/components';
import { inferControls } from '@storybook/store';
import { extractArgTypes } from './extractArgTypes';

const argsTableProps = component => {
  const argTypes = extractArgTypes(component);
  const parameters = {
    __isArgsStory: true
  };
  const rows = inferControls({
    argTypes,
    parameters
  });
  return {
    rows
  };
};

const ArgsStory = ({
  component
}) => {
  const {
    rows
  } = argsTableProps(component);
  const initialArgs = mapValues(rows, argType => argType.defaultValue);
  const [args, setArgs] = useState(initialArgs);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "NOTE:"), " these stories are to help visualise the snapshot tests in", ' ', /*#__PURE__*/React.createElement("code", null, "./react-properties.test.js"), "."), /*#__PURE__*/React.createElement(ArgsTable, {
    rows: rows,
    args: args,
    updateArgs: val => setArgs(Object.assign({}, args, val))
  }), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "arg name"), /*#__PURE__*/React.createElement("th", null, "argType"))), /*#__PURE__*/React.createElement("tbody", null, Object.entries(args).map(([key, val]) => /*#__PURE__*/React.createElement("tr", {
    key: key
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("code", null, key)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(rows[key]))))))));
};

const typescriptFixtures = ['aliases', 'arrays', 'enums', 'functions', 'interfaces', 'intersections', 'records', 'scalars', 'tuples', 'unions', 'optionals'];
const typescriptStories = storiesOf('ArgTypes/TypeScript', module);
typescriptFixtures.forEach(fixture => {
  // eslint-disable-next-line import/no-dynamic-require, global-require, no-shadow
  const {
    Component
  } = require(`../../lib/convert/__testfixtures__/typescript/${fixture}`);

  typescriptStories.add(fixture, () => /*#__PURE__*/React.createElement(ArgsStory, {
    component: Component
  }));
});
const proptypesFixtures = ['arrays', 'enums', 'misc', 'objects', 'react', 'scalars'];
const proptypesStories = storiesOf('ArgTypes/PropTypes', module);
proptypesFixtures.forEach(fixture => {
  // eslint-disable-next-line import/no-dynamic-require, global-require, no-shadow
  const {
    Component
  } = require(`../../lib/convert/__testfixtures__/proptypes/${fixture}`);

  proptypesStories.add(fixture, () => /*#__PURE__*/React.createElement(ArgsStory, {
    component: Component
  }));
});
const issuesFixtures = ['js-class-component', 'js-function-component', 'js-function-component-inline-defaults', 'js-function-component-inline-defaults-no-propTypes', 'ts-function-component', 'ts-function-component-inline-defaults', '9399-js-proptypes-shape', '8663-js-styled-components', '9626-js-default-values', '9668-js-proptypes-no-jsdoc', '8143-ts-react-fc-generics', '8143-ts-imported-types', '8279-js-styled-docgen', '8140-js-prop-types-oneof', '9023-js-hoc', '8740-ts-multi-props', '9556-ts-react-default-exports', '9592-ts-styled-props', '9591-ts-import-types', '9721-ts-deprecated-jsdoc', '9827-ts-default-values', '9586-js-react-memo', '9575-ts-camel-case', '9493-ts-display-name', '8894-9511-ts-forward-ref', '9465-ts-type-props', '8428-js-static-prop-types', '9764-ts-extend-props', '9922-ts-component-props'];
const issuesStories = storiesOf('ArgTypes/Issues', module);
issuesFixtures.forEach(fixture => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const {
    component
  } = require(`./__testfixtures__/${fixture}/input`);

  issuesStories.add(fixture, () => /*#__PURE__*/React.createElement(ArgsStory, {
    component: component
  }), {
    chromatic: {
      disable: true
    }
  });
});