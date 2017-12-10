import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends Component {
    render() {
        return ReactDOM.createPortal(this.props.children, this.props.domNode);
    }
}
