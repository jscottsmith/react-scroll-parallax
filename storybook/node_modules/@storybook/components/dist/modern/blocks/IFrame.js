function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Component } from 'react';
import global from 'global';
const {
  window: globalWindow
} = global;
export class IFrame extends Component {
  constructor(...args) {
    super(...args);
    this.iframe = null;
  }

  componentDidMount() {
    const {
      id
    } = this.props;
    this.iframe = globalWindow.document.getElementById(id);
  }

  shouldComponentUpdate(nextProps) {
    const {
      scale
    } = nextProps; // eslint-disable-next-line react/destructuring-assignment

    if (scale !== this.props.scale) {
      this.setIframeBodyStyle({
        width: `${scale * 100}%`,
        height: `${scale * 100}%`,
        transform: `scale(${1 / scale})`,
        transformOrigin: 'top left'
      });
    }

    return false;
  }

  setIframeBodyStyle(style) {
    return Object.assign(this.iframe.contentDocument.body.style, style);
  }

  render() {
    const _this$props = this.props,
          {
      id,
      title,
      src,
      allowFullScreen
    } = _this$props,
          rest = _objectWithoutPropertiesLoose(_this$props, ["id", "title", "src", "allowFullScreen", "scale"]);

    return /*#__PURE__*/React.createElement("iframe", _extends({
      id: id,
      title: title,
      src: src,
      allowFullScreen: allowFullScreen // @ts-ignore
      ,
      loading: "lazy"
    }, rest));
  }

}
IFrame.displayName = "IFrame";