import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inputUsageTypes from '../types/inputUsageTypes';

class JsonAddValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRefKey: null,
      inputRefValue: null
    }; // Bind

    this.refInputValue = this.refInputValue.bind(this);
    this.refInputKey = this.refInputKey.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      inputRefKey,
      inputRefValue
    } = this.state;
    const {
      onlyValue
    } = this.props;

    if (inputRefKey && typeof inputRefKey.focus === 'function') {
      inputRefKey.focus();
    }

    if (onlyValue && inputRefValue && typeof inputRefValue.focus === 'function') {
      inputRefValue.focus();
    }

    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return;

    if (event.code === 'Enter' || event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }

    if (event.code === 'Escape' || event.key === 'Escape') {
      event.preventDefault();
      this.props.handleCancel();
    }
  }

  onSubmit() {
    const {
      handleAdd,
      onlyValue,
      onSubmitValueParser,
      keyPath,
      deep
    } = this.props;
    const {
      inputRefKey,
      inputRefValue
    } = this.state;
    const result = {}; // Check if we have the key

    if (!onlyValue) {
      // Check that there is a key
      if (!inputRefKey.value) {
        // Empty key => Not authorized
        return;
      }

      result.key = inputRefKey.value;
    }

    result.newValue = onSubmitValueParser(false, keyPath, deep, result.key, inputRefValue.value);
    handleAdd(result);
  }

  refInputKey(node) {
    this.state.inputRefKey = node;
  }

  refInputValue(node) {
    this.state.inputRefValue = node;
  }

  render() {
    const {
      handleCancel,
      onlyValue,
      addButtonElement,
      cancelButtonElement,
      inputElementGenerator,
      keyPath,
      deep
    } = this.props;
    const addButtonElementLayout = /*#__PURE__*/React.cloneElement(addButtonElement, {
      onClick: this.onSubmit
    });
    const cancelButtonElementLayout = /*#__PURE__*/React.cloneElement(cancelButtonElement, {
      onClick: handleCancel
    });
    const inputElementValue = inputElementGenerator(inputUsageTypes.VALUE, keyPath, deep);
    const inputElementValueLayout = /*#__PURE__*/React.cloneElement(inputElementValue, {
      placeholder: 'Value',
      ref: this.refInputValue
    });
    let inputElementKeyLayout = null;

    if (!onlyValue) {
      const inputElementKey = inputElementGenerator(inputUsageTypes.KEY, keyPath, deep);
      inputElementKeyLayout = /*#__PURE__*/React.cloneElement(inputElementKey, {
        placeholder: 'Key',
        ref: this.refInputKey
      });
    }

    return /*#__PURE__*/React.createElement("span", {
      className: "rejt-add-value-node"
    }, inputElementKeyLayout, inputElementValueLayout, cancelButtonElementLayout, addButtonElementLayout);
  }

}

JsonAddValue.displayName = "JsonAddValue";
JsonAddValue.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onlyValue: PropTypes.bool,
  addButtonElement: PropTypes.element,
  cancelButtonElement: PropTypes.element,
  inputElementGenerator: PropTypes.func.isRequired,
  keyPath: PropTypes.array,
  deep: PropTypes.number,
  onSubmitValueParser: PropTypes.func.isRequired
};
JsonAddValue.defaultProps = {
  onlyValue: false,
  addButtonElement: /*#__PURE__*/React.createElement("button", null, "+"),
  cancelButtonElement: /*#__PURE__*/React.createElement("button", null, "c")
};
export default JsonAddValue;