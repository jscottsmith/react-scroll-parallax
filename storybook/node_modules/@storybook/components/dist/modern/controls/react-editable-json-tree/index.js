import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JsonNode from './components/JsonNode';
import { value, object, array } from './utils/styles';
import { ADD_DELTA_TYPE, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE } from './types/deltaTypes';
import { getObjectType } from './utils/objectTypes';
import DATA_TYPES from './types/dataTypes';
import INPUT_USAGE_TYPES from './types/inputUsageTypes';
import parse from './utils/parse';

class JsonTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      rootName: props.rootName
    }; // Bind

    this.onUpdate = this.onUpdate.bind(this);
    this.removeRoot = this.removeRoot.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.data || props.rootName !== state.rootName) {
      return {
        data: props.data,
        rootName: props.rootName
      };
    }

    return null;
  }

  onUpdate(key, data) {
    this.setState({
      data
    });
    this.props.onFullyUpdate(data);
  }

  removeRoot() {
    this.onUpdate(null, null);
  }

  render() {
    const {
      data,
      rootName
    } = this.state;
    const {
      isCollapsed,
      onDeltaUpdate,
      readOnly,
      getStyle,
      addButtonElement,
      cancelButtonElement,
      editButtonElement,
      inputElement,
      textareaElement,
      minusMenuElement,
      plusMenuElement,
      beforeRemoveAction,
      beforeAddAction,
      beforeUpdateAction,
      logger,
      onSubmitValueParser,
      fallback
    } = this.props; // Node type

    const dataType = getObjectType(data);
    let readOnlyFunction = readOnly;

    if (getObjectType(readOnly) === 'Boolean') {
      readOnlyFunction = () => readOnly;
    }

    let inputElementFunction = inputElement;

    if (inputElement && getObjectType(inputElement) !== 'Function') {
      inputElementFunction = () => inputElement;
    }

    let textareaElementFunction = textareaElement;

    if (textareaElement && getObjectType(textareaElement) !== 'Function') {
      textareaElementFunction = () => textareaElement;
    }

    if (dataType === 'Object' || dataType === 'Array') {
      return /*#__PURE__*/React.createElement("div", {
        className: "rejt-tree"
      }, /*#__PURE__*/React.createElement(JsonNode, {
        data: data,
        name: rootName,
        collapsed: false,
        deep: -1,
        isCollapsed: isCollapsed,
        onUpdate: this.onUpdate,
        onDeltaUpdate: onDeltaUpdate,
        readOnly: readOnlyFunction,
        getStyle: getStyle,
        addButtonElement: addButtonElement,
        cancelButtonElement: cancelButtonElement,
        editButtonElement: editButtonElement,
        inputElementGenerator: inputElementFunction,
        textareaElementGenerator: textareaElementFunction,
        minusMenuElement: minusMenuElement,
        plusMenuElement: plusMenuElement,
        handleRemove: this.removeRoot,
        beforeRemoveAction: beforeRemoveAction,
        beforeAddAction: beforeAddAction,
        beforeUpdateAction: beforeUpdateAction,
        logger: logger,
        onSubmitValueParser: onSubmitValueParser
      }));
    }

    return fallback;
  }

}

JsonTree.displayName = "JsonTree";
JsonTree.propTypes = {
  data: PropTypes.any.isRequired,
  rootName: PropTypes.string,
  isCollapsed: PropTypes.func,
  onFullyUpdate: PropTypes.func,
  onDeltaUpdate: PropTypes.func,
  readOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  getStyle: PropTypes.func,
  addButtonElement: PropTypes.element,
  cancelButtonElement: PropTypes.element,
  editButtonElement: PropTypes.element,
  inputElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  textareaElement: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  minusMenuElement: PropTypes.element,
  plusMenuElement: PropTypes.element,
  beforeRemoveAction: PropTypes.func,
  beforeAddAction: PropTypes.func,
  beforeUpdateAction: PropTypes.func,
  logger: PropTypes.object,
  onSubmitValueParser: PropTypes.func
};
JsonTree.defaultProps = {
  rootName: 'root',
  isCollapsed: (keyPath, deep) => deep !== -1,
  getStyle: (keyName, data, keyPath, deep, dataType) => {
    switch (dataType) {
      case 'Object':
      case 'Error':
        return object;

      case 'Array':
        return array;

      default:
        return value;
    }
  },

  /* eslint-disable no-unused-vars */
  readOnly: (keyName, data, keyPath, deep, dataType) => false,
  onFullyUpdate: data => {},
  onDeltaUpdate: ({
    type,
    keyPath,
    deep,
    key,
    newValue,
    oldValue
  }) => {},
  beforeRemoveAction: (key, keyPath, deep, oldValue) => new Promise(resolve => resolve()),
  beforeAddAction: (key, keyPath, deep, newValue) => new Promise(resolve => resolve()),
  beforeUpdateAction: (key, keyPath, deep, oldValue, newValue) => new Promise(resolve => resolve()),
  logger: {
    error: () => {}
  },
  onSubmitValueParser: (isEditMode, keyPath, deep, name, rawValue) => parse(rawValue),
  inputElement: (usage, keyPath, deep, keyName, data, dataType) => /*#__PURE__*/React.createElement("input", null),
  textareaElement: (usage, keyPath, deep, keyName, data, dataType) => /*#__PURE__*/React.createElement("textarea", null),

  /* eslint-enable */
  fallback: null
};
export { JsonTree };
export { getObjectType };
export { ADD_DELTA_TYPE };
export { REMOVE_DELTA_TYPE };
export { UPDATE_DELTA_TYPE };
export { DATA_TYPES };
export { INPUT_USAGE_TYPES };