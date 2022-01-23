import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isComponentWillChange } from '../utils/objectTypes';
import inputUsageTypes from '../types/inputUsageTypes';

class JsonValue extends Component {
  constructor(props) {
    super(props);
    const keyPath = [...props.keyPath, props.name];
    this.state = {
      value: props.value,
      name: props.name,
      keyPath,
      deep: props.deep,
      editEnabled: false,
      inputRef: null
    }; // Bind

    this.handleEditMode = this.handleEditMode.bind(this);
    this.refInput = this.refInput.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return props.value !== state.value ? {
      value: props.value
    } : null;
  }

  componentDidUpdate() {
    const {
      editEnabled,
      inputRef,
      name,
      value,
      keyPath,
      deep
    } = this.state;
    const {
      readOnly,
      dataType
    } = this.props;
    const isReadOnly = readOnly(name, value, keyPath, deep, dataType);

    if (editEnabled && !isReadOnly && typeof inputRef.focus === 'function') {
      inputRef.focus();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return;

    if (event.code === 'Enter' || event.key === 'Enter') {
      event.preventDefault();
      this.handleEdit();
    }

    if (event.code === 'Escape' || event.key === 'Escape') {
      event.preventDefault();
      this.handleCancelEdit();
    }
  }

  handleEdit() {
    const {
      handleUpdateValue,
      originalValue,
      logger,
      onSubmitValueParser,
      keyPath
    } = this.props;
    const {
      inputRef,
      name,
      deep
    } = this.state;
    if (!inputRef) return;
    const newValue = onSubmitValueParser(true, keyPath, deep, name, inputRef.value);
    const result = {
      value: newValue,
      key: name
    }; // Run update

    handleUpdateValue(result).then(() => {
      // Cancel edit mode if necessary
      if (!isComponentWillChange(originalValue, newValue)) {
        this.handleCancelEdit();
      }
    }).catch(logger.error);
  }

  handleEditMode() {
    this.setState({
      editEnabled: true
    });
  }

  refInput(node) {
    this.state.inputRef = node;
  }

  handleCancelEdit() {
    this.setState({
      editEnabled: false
    });
  }

  render() {
    const {
      name,
      value,
      editEnabled,
      keyPath,
      deep
    } = this.state;
    const {
      handleRemove,
      originalValue,
      readOnly,
      dataType,
      getStyle,
      editButtonElement,
      cancelButtonElement,
      inputElementGenerator,
      minusMenuElement,
      keyPath: comeFromKeyPath
    } = this.props;
    const style = getStyle(name, originalValue, keyPath, deep, dataType);
    const isReadOnly = readOnly(name, originalValue, keyPath, deep, dataType);
    const isEditing = editEnabled && !isReadOnly;
    const inputElement = inputElementGenerator(inputUsageTypes.VALUE, comeFromKeyPath, deep, name, originalValue, dataType);
    const editButtonElementLayout = /*#__PURE__*/React.cloneElement(editButtonElement, {
      onClick: this.handleEdit
    });
    const cancelButtonElementLayout = /*#__PURE__*/React.cloneElement(cancelButtonElement, {
      onClick: this.handleCancelEdit
    });
    const inputElementLayout = /*#__PURE__*/React.cloneElement(inputElement, {
      ref: this.refInput,
      defaultValue: JSON.stringify(originalValue)
    });
    const minusMenuLayout = /*#__PURE__*/React.cloneElement(minusMenuElement, {
      onClick: handleRemove,
      className: 'rejt-minus-menu',
      style: style.minus
    });
    return /*#__PURE__*/React.createElement("li", {
      className: "rejt-value-node",
      style: style.li
    }, /*#__PURE__*/React.createElement("span", {
      className: "rejt-name",
      style: style.name
    }, name, ' : '), isEditing ? /*#__PURE__*/React.createElement("span", {
      className: "rejt-edit-form",
      style: style.editForm
    }, inputElementLayout, " ", cancelButtonElementLayout, editButtonElementLayout) : /*#__PURE__*/React.createElement("span", {
      className: "rejt-value",
      style: style.value,
      onClick: isReadOnly ? null : this.handleEditMode
    }, String(value)), !isReadOnly && !isEditing && minusMenuLayout);
  }

}

JsonValue.displayName = "JsonValue";
JsonValue.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  originalValue: PropTypes.any,
  keyPath: PropTypes.array,
  deep: PropTypes.number,
  handleRemove: PropTypes.func,
  handleUpdateValue: PropTypes.func,
  readOnly: PropTypes.func.isRequired,
  dataType: PropTypes.string,
  getStyle: PropTypes.func.isRequired,
  editButtonElement: PropTypes.element,
  cancelButtonElement: PropTypes.element,
  inputElementGenerator: PropTypes.func.isRequired,
  minusMenuElement: PropTypes.element,
  logger: PropTypes.object.isRequired,
  onSubmitValueParser: PropTypes.func.isRequired
};
JsonValue.defaultProps = {
  keyPath: [],
  deep: 0,
  handleUpdateValue: () => Promise.resolve(),
  editButtonElement: /*#__PURE__*/React.createElement("button", null, "e"),
  cancelButtonElement: /*#__PURE__*/React.createElement("button", null, "c"),
  minusMenuElement: /*#__PURE__*/React.createElement("span", null, " - ")
};
export default JsonValue;