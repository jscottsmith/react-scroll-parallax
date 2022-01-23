import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JsonNode from './JsonNode';
import JsonAddValue from './JsonAddValue';
import { ADD_DELTA_TYPE, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE } from '../types/deltaTypes';

class JsonObject extends Component {
  constructor(props) {
    super(props);
    const keyPath = props.deep === -1 ? [] : [...props.keyPath, props.name];
    this.state = {
      name: props.name,
      data: props.data,
      keyPath,
      deep: props.deep,
      nextDeep: props.deep + 1,
      collapsed: props.isCollapsed(keyPath, props.deep, props.data),
      addFormVisible: false
    }; // Bind

    this.handleCollapseMode = this.handleCollapseMode.bind(this);
    this.handleRemoveValue = this.handleRemoveValue.bind(this);
    this.handleAddMode = this.handleAddMode.bind(this);
    this.handleAddValueAdd = this.handleAddValueAdd.bind(this);
    this.handleAddValueCancel = this.handleAddValueCancel.bind(this);
    this.handleEditValue = this.handleEditValue.bind(this);
    this.onChildUpdate = this.onChildUpdate.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
    this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return props.data !== state.data ? {
      data: props.data
    } : null;
  }

  onChildUpdate(childKey, childData) {
    const {
      data,
      keyPath
    } = this.state; // Update data

    data[childKey] = childData; // Put new data

    this.setState({
      data
    }); // Spread

    const {
      onUpdate
    } = this.props;
    const size = keyPath.length;
    onUpdate(keyPath[size - 1], data);
  }

  handleAddMode() {
    this.setState({
      addFormVisible: true
    });
  }

  handleAddValueCancel() {
    this.setState({
      addFormVisible: false
    });
  }

  handleAddValueAdd({
    key,
    newValue
  }) {
    const {
      data,
      keyPath,
      nextDeep: deep
    } = this.state;
    const {
      beforeAddAction,
      logger
    } = this.props;
    beforeAddAction(key, keyPath, deep, newValue).then(() => {
      // Update data
      data[key] = newValue;
      this.setState({
        data
      }); // Cancel add to close

      this.handleAddValueCancel(); // Spread new update

      const {
        onUpdate,
        onDeltaUpdate
      } = this.props;
      onUpdate(keyPath[keyPath.length - 1], data); // Spread delta update

      onDeltaUpdate({
        type: ADD_DELTA_TYPE,
        keyPath,
        deep,
        key,
        newValue
      });
    }).catch(logger.error);
  }

  handleRemoveValue(key) {
    return () => {
      const {
        beforeRemoveAction,
        logger
      } = this.props;
      const {
        data,
        keyPath,
        nextDeep: deep
      } = this.state;
      const oldValue = data[key]; // Before Remove Action

      beforeRemoveAction(key, keyPath, deep, oldValue).then(() => {
        const deltaUpdateResult = {
          keyPath,
          deep,
          key,
          oldValue,
          type: REMOVE_DELTA_TYPE
        };
        delete data[key];
        this.setState({
          data
        }); // Spread new update

        const {
          onUpdate,
          onDeltaUpdate
        } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data); // Spread delta update

        onDeltaUpdate(deltaUpdateResult);
      }).catch(logger.error);
    };
  }

  handleCollapseMode() {
    this.setState(state => ({
      collapsed: !state.collapsed
    }));
  }

  handleEditValue({
    key,
    value
  }) {
    return new Promise((resolve, reject) => {
      const {
        beforeUpdateAction
      } = this.props;
      const {
        data,
        keyPath,
        nextDeep: deep
      } = this.state; // Old value

      const oldValue = data[key]; // Before update action

      beforeUpdateAction(key, keyPath, deep, oldValue, value).then(() => {
        // Update value
        data[key] = value; // Set state

        this.setState({
          data
        }); // Spread new update

        const {
          onUpdate,
          onDeltaUpdate
        } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data); // Spread delta update

        onDeltaUpdate({
          type: UPDATE_DELTA_TYPE,
          keyPath,
          deep,
          key,
          newValue: value,
          oldValue
        }); // Resolve

        resolve();
      }).catch(reject);
    });
  }

  renderCollapsed() {
    const {
      name,
      keyPath,
      deep,
      data
    } = this.state;
    const {
      handleRemove,
      readOnly,
      dataType,
      getStyle,
      minusMenuElement
    } = this.props;
    const {
      minus,
      collapsed
    } = getStyle(name, data, keyPath, deep, dataType);
    const keyList = Object.getOwnPropertyNames(data);
    const isReadOnly = readOnly(name, data, keyPath, deep, dataType);
    const removeItemButton = /*#__PURE__*/React.cloneElement(minusMenuElement, {
      onClick: handleRemove,
      className: 'rejt-minus-menu',
      style: minus
    });
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return /*#__PURE__*/React.createElement("span", {
      className: "rejt-collapsed"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rejt-collapsed-text",
      style: collapsed,
      onClick: this.handleCollapseMode
    }, '{...}', " ", keyList.length, " ", keyList.length === 1 ? 'key' : 'keys'), !isReadOnly && removeItemButton);
    /* eslint-enable */
  }

  renderNotCollapsed() {
    const {
      name,
      data,
      keyPath,
      deep,
      nextDeep,
      addFormVisible
    } = this.state;
    const {
      isCollapsed,
      handleRemove,
      onDeltaUpdate,
      readOnly,
      getStyle,
      dataType,
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
    const {
      minus,
      plus,
      addForm,
      ul,
      delimiter
    } = getStyle(name, data, keyPath, deep, dataType);
    const keyList = Object.getOwnPropertyNames(data);
    const isReadOnly = readOnly(name, data, keyPath, deep, dataType);
    const addItemButton = /*#__PURE__*/React.cloneElement(plusMenuElement, {
      onClick: this.handleAddMode,
      className: 'rejt-plus-menu',
      style: plus
    });
    const removeItemButton = /*#__PURE__*/React.cloneElement(minusMenuElement, {
      onClick: handleRemove,
      className: 'rejt-minus-menu',
      style: minus
    });
    const list = keyList.map(key => /*#__PURE__*/React.createElement(JsonNode, {
      key: key,
      name: key,
      data: data[key],
      keyPath: keyPath,
      deep: nextDeep,
      isCollapsed: isCollapsed,
      handleRemove: this.handleRemoveValue(key),
      handleUpdateValue: this.handleEditValue,
      onUpdate: this.onChildUpdate,
      onDeltaUpdate: onDeltaUpdate,
      readOnly: readOnly,
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
    }));
    const startObject = '{';
    const endObject = '}';
    return /*#__PURE__*/React.createElement("span", {
      className: "rejt-not-collapsed"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rejt-not-collapsed-delimiter",
      style: delimiter
    }, startObject), !isReadOnly && addItemButton, /*#__PURE__*/React.createElement("ul", {
      className: "rejt-not-collapsed-list",
      style: ul
    }, list), !isReadOnly && addFormVisible && /*#__PURE__*/React.createElement("div", {
      className: "rejt-add-form",
      style: addForm
    }, /*#__PURE__*/React.createElement(JsonAddValue, {
      handleAdd: this.handleAddValueAdd,
      handleCancel: this.handleAddValueCancel,
      addButtonElement: addButtonElement,
      cancelButtonElement: cancelButtonElement,
      inputElementGenerator: inputElementGenerator,
      keyPath: keyPath,
      deep: deep,
      onSubmitValueParser: onSubmitValueParser
    })), /*#__PURE__*/React.createElement("span", {
      className: "rejt-not-collapsed-delimiter",
      style: delimiter
    }, endObject), !isReadOnly && removeItemButton);
  }

  render() {
    const {
      name,
      collapsed,
      data,
      keyPath,
      deep
    } = this.state;
    const {
      getStyle,
      dataType
    } = this.props;
    const value = collapsed ? this.renderCollapsed() : this.renderNotCollapsed();
    const style = getStyle(name, data, keyPath, deep, dataType);
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return /*#__PURE__*/React.createElement("div", {
      className: "rejt-object-node"
    }, /*#__PURE__*/React.createElement("span", {
      onClick: this.handleCollapseMode
    }, /*#__PURE__*/React.createElement("span", {
      className: "rejt-name",
      style: style.name
    }, name, " :", ' ')), value);
    /* eslint-enable */
  }

}

JsonObject.displayName = "JsonObject";
JsonObject.propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  isCollapsed: PropTypes.func.isRequired,
  keyPath: PropTypes.array,
  deep: PropTypes.number,
  handleRemove: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  onDeltaUpdate: PropTypes.func.isRequired,
  readOnly: PropTypes.func.isRequired,
  dataType: PropTypes.string,
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
JsonObject.defaultProps = {
  keyPath: [],
  deep: 0,
  minusMenuElement: /*#__PURE__*/React.createElement("span", null, " - "),
  plusMenuElement: /*#__PURE__*/React.createElement("span", null, " + ")
};
export default JsonObject;