import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JsonValue from './JsonValue';
import JsonObject from './JsonObject';
import JsonArray from './JsonArray';
import JsonFunctionValue from './JsonFunctionValue';
import { getObjectType } from '../utils/objectTypes';
import dataTypes from '../types/dataTypes';

class JsonNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      name: props.name,
      keyPath: props.keyPath,
      deep: props.deep
    };
  }

  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? {
      data: props.data
    } : null;
  }

  render() {
    const {
      data,
      name,
      keyPath,
      deep
    } = this.state;
    const {
      isCollapsed,
      handleRemove,
      handleUpdateValue,
      onUpdate,
      onDeltaUpdate,
      readOnly,
      getStyle,
      addButtonElement,
      cancelButtonElement,
      editButtonElement,
      inputElementGenerator,
      textareaElementGenerator,
      minusMenuElement,
      plusMenuElement,
      beforeRemoveAction,
      beforeAddAction,
      beforeUpdateAction,
      logger,
      onSubmitValueParser
    } = this.props;

    const readOnlyTrue = () => true;

    const dataType = getObjectType(data);

    switch (dataType) {
      case dataTypes.ERROR:
        return /*#__PURE__*/React.createElement(JsonObject, {
          data: data,
          name: name,
          isCollapsed: isCollapsed,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          onUpdate: onUpdate,
          onDeltaUpdate: onDeltaUpdate,
          readOnly: readOnlyTrue,
          dataType: dataType,
          getStyle: getStyle,
          addButtonElement: addButtonElement,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          textareaElementGenerator: textareaElementGenerator,
          minusMenuElement: minusMenuElement,
          plusMenuElement: plusMenuElement,
          beforeRemoveAction: beforeRemoveAction,
          beforeAddAction: beforeAddAction,
          beforeUpdateAction: beforeUpdateAction,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.OBJECT:
        return /*#__PURE__*/React.createElement(JsonObject, {
          data: data,
          name: name,
          isCollapsed: isCollapsed,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          onUpdate: onUpdate,
          onDeltaUpdate: onDeltaUpdate,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          addButtonElement: addButtonElement,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          textareaElementGenerator: textareaElementGenerator,
          minusMenuElement: minusMenuElement,
          plusMenuElement: plusMenuElement,
          beforeRemoveAction: beforeRemoveAction,
          beforeAddAction: beforeAddAction,
          beforeUpdateAction: beforeUpdateAction,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.ARRAY:
        return /*#__PURE__*/React.createElement(JsonArray, {
          data: data,
          name: name,
          isCollapsed: isCollapsed,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          onUpdate: onUpdate,
          onDeltaUpdate: onDeltaUpdate,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          addButtonElement: addButtonElement,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          textareaElementGenerator: textareaElementGenerator,
          minusMenuElement: minusMenuElement,
          plusMenuElement: plusMenuElement,
          beforeRemoveAction: beforeRemoveAction,
          beforeAddAction: beforeAddAction,
          beforeUpdateAction: beforeUpdateAction,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.STRING:
        return /*#__PURE__*/React.createElement(JsonValue, {
          name: name,
          value: `"${data}"`,
          originalValue: data,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.NUMBER:
        return /*#__PURE__*/React.createElement(JsonValue, {
          name: name,
          value: data,
          originalValue: data,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.BOOLEAN:
        return /*#__PURE__*/React.createElement(JsonValue, {
          name: name,
          value: data ? 'true' : 'false',
          originalValue: data,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.DATE:
        return /*#__PURE__*/React.createElement(JsonValue, {
          name: name,
          value: data.toISOString(),
          originalValue: data,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnlyTrue,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.NULL:
        return /*#__PURE__*/React.createElement(JsonValue, {
          name: name,
          value: 'null',
          originalValue: 'null',
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.UNDEFINED:
        return /*#__PURE__*/React.createElement(JsonValue, {
          name: name,
          value: 'undefined',
          originalValue: 'undefined',
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.FUNCTION:
        return /*#__PURE__*/React.createElement(JsonFunctionValue, {
          name: name,
          value: data.toString(),
          originalValue: data,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnly,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          textareaElementGenerator: textareaElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      case dataTypes.SYMBOL:
        return /*#__PURE__*/React.createElement(JsonValue, {
          name: name,
          value: data.toString(),
          originalValue: data,
          keyPath: keyPath,
          deep: deep,
          handleRemove: handleRemove,
          handleUpdateValue: handleUpdateValue,
          readOnly: readOnlyTrue,
          dataType: dataType,
          getStyle: getStyle,
          cancelButtonElement: cancelButtonElement,
          editButtonElement: editButtonElement,
          inputElementGenerator: inputElementGenerator,
          minusMenuElement: minusMenuElement,
          logger: logger,
          onSubmitValueParser: onSubmitValueParser
        });

      default:
        return null;
    }
  }

}

JsonNode.displayName = "JsonNode";
JsonNode.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.any,
  isCollapsed: PropTypes.func.isRequired,
  keyPath: PropTypes.array,
  deep: PropTypes.number,
  handleRemove: PropTypes.func,
  handleUpdateValue: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  onDeltaUpdate: PropTypes.func.isRequired,
  readOnly: PropTypes.func.isRequired,
  getStyle: PropTypes.func.isRequired,
  addButtonElement: PropTypes.element,
  cancelButtonElement: PropTypes.element,
  editButtonElement: PropTypes.element,
  inputElementGenerator: PropTypes.func.isRequired,
  textareaElementGenerator: PropTypes.func.isRequired,
  minusMenuElement: PropTypes.element,
  plusMenuElement: PropTypes.element,
  beforeRemoveAction: PropTypes.func,
  beforeAddAction: PropTypes.func,
  beforeUpdateAction: PropTypes.func,
  logger: PropTypes.object.isRequired,
  onSubmitValueParser: PropTypes.func.isRequired
};
JsonNode.defaultProps = {
  keyPath: [],
  deep: 0
};
export default JsonNode;