import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ParallaxContext } from '../../src/context/ParallaxContext';
import { ParallaxController } from 'parallax-controller';

export class MockProvider extends Component<{
  children: ReactNode;
  controllerMock: ParallaxController;
}> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    controllerMock: PropTypes.object.isRequired,
  };
  controller: ParallaxController;

  constructor(props: {
    children: ReactNode;
    controllerMock: ParallaxController;
  }) {
    super(props);
    this.controller = props.controllerMock;
  }

  componentWillUnmount() {
    if (!this.controller) return;
    this.controller.destroy();
    // @ts-ignore
    this.controller = undefined;
  }

  render() {
    const { children } = this.props;

    return (
      <ParallaxContext.Provider value={this.controller}>
        {children}
      </ParallaxContext.Provider>
    );
  }
}
