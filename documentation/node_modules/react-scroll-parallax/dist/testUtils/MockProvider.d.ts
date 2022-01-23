import { Component } from 'react';
import PropTypes from 'prop-types';
import { ParallaxController } from 'parallax-controller';
export declare class MockProvider extends Component {
    static propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        controllerMock: PropTypes.Validator<object>;
    };
    controller: ParallaxController;
    constructor(props: {
        controllerMock: ParallaxController;
    });
    componentWillUnmount(): void;
    render(): JSX.Element;
}
