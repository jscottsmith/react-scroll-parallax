import React, { Component, PropsWithChildren } from 'react';
import { ParallaxContext } from '../../src/context/ParallaxContext';
import { ParallaxController } from 'parallax-controller';

interface MockProviderProps {
  controllerMock: ParallaxController;
}

export class MockProvider extends Component<
  PropsWithChildren<MockProviderProps>
> {
  controller: ParallaxController;

  constructor(props: PropsWithChildren<MockProviderProps>) {
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
