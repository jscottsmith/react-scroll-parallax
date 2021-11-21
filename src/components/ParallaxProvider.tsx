import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParallaxContext from '../helpers/ParallaxContext';
import ParallaxController from '../classes/ParallaxController';
import { VERTICAL, HORIZONTAL } from '../constants';
import validHTMLElement from '../utils/validHTMLElement';

const createController = (options) => {
  // Don't initialize on the server
  const isServer = typeof window === 'undefined';

  if (!isServer) {
    // Must not be the server so kick it off...
    return ParallaxController.init(options);
  }
  return null;
};

export interface ParallaxProviderProps {
  /**
   * Optionally pass the scroll axis for setting horizontal/vertical scrolling. One of vertical or
   * horizontal
   */
  scrollAxis?: 'vertical' | 'horizontal';
  /**
   * Optionally set the container that has overflow and will contain parallax elements. Defaults
   * to the HTML body
   */
  scrollContainer?: any;
}

export default class ParallaxProvider extends Component<
  ParallaxProviderProps,
  {}
> {
  static defaultProps = {
    scrollAxis: VERTICAL,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    scrollAxis: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
    scrollContainer: validHTMLElement,
  };

  constructor(props) {
    super(props);
    // @ts-ignore
    this.controller = createController({
      scrollAxis: props.scrollAxis,
      scrollContainer: props.scrollContainer,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scrollContainer !== this.props.scrollContainer) {
      // @ts-ignore
      this.controller.updateScrollContainer(this.props.scrollContainer);
    }
  }

  componentWillUnmount() {
    // @ts-ignore
    this.controller = this.controller.destroy();
  }

  render() {
    const { children } = this.props;
    return (
      // @ts-ignore
      <ParallaxContext.Provider value={this.controller}>
        {children}
      </ParallaxContext.Provider>
    );
  }
}
