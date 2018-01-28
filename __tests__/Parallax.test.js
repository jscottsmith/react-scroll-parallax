import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Parallax from 'components/Parallax';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'libs/ParallaxController';

// provides a controller to the provider for mocking tests
class MockProvider extends Component {
    static childContextTypes = {
        parallaxController: PropTypes.object,
    };

    getChildContext() {
        const { controllerMock } = this.props;
        return { parallaxController: controllerMock };
    }

    componentWillUnmount() {
        this.props.controllerMock.destroy();
    }

    render() {
        const { children } = this.props;
        return children;
    }
}

const log = global.console.log;

describe('Expect the <Parallax> component', () => {
    afterEach(() => {
        global.console.log = log;
        global.ParallaxController = undefined;
    });

    it('to render correctly', () => {
        // Workaround for refs
        // See https://github.com/facebook/react/issues/7740
        const div = document.createElement('div');
        function createNodeMock() {
            return {
                getBoundingClientRect: () => div.getBoundingClientRect(),
            };
        }

        const tree = renderer
            .create(
                <ParallaxProvider>
                    <Parallax
                        className="class-foo"
                        disabled={false}
                        offsetXMax={100}
                        offsetXMin={-100}
                        offsetYMax="75%"
                        offsetYMin="-75%"
                        slowerScrollRate={false}
                        styleOuter={{
                            border: 'solid red 2px',
                        }}
                        styleInner={{
                            border: 'solid blue 2px',
                        }}
                        tag="figure"
                    >
                        <div className="foo" />
                    </Parallax>
                </ParallaxProvider>,
                {
                    createNodeMock,
                }
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('to throw if the ParallaxController is not available', () => {
        const node = document.createElement('div');
        // NOTE: hide error and react warning
        // see issue: https://github.com/facebook/jest/issues/4597
        const preventError = e => e.preventDefault();
        window.addEventListener('error', preventError, true);
        Error.prototype.suppressReactErrorLogging = true;

        const render = () => {
            ReactDOM.render(
                <Parallax>
                    <div />
                </Parallax>,
                node
            );
        };

        expect(render).toThrow(
            "Must wrap your application's <Parallax /> components in a <ParallaxProvider />."
        );

        window.removeEventListener('error', preventError, true);
        Error.prototype.suppressReactErrorLogging = false;
    });

    it('to warn if the ParallaxController is found but not provided by <ParallaxProvider>', () => {
        const node = document.createElement('div');

        global.console.log = jest.fn();
        global.ParallaxController = ParallaxController.init();

        ReactDOM.render(
            <Parallax>
                <div />
            </Parallax>,
            node
        );

        expect(global.console.log).toBeCalledWith(
            'Calling ParallaxController.init() has been deprecated in favor of using the <ParallaxProvider /> component. For usage details see: https://github.com/jscottsmith/react-scroll-parallax/tree/v1.1.0#usage'
        );
    });

    it('to create an element in the controller on mount', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init();
        controller.createElement = jest.fn();

        ReactDOM.render(
            <MockProvider controllerMock={controller}>
                <Parallax offsetYMin={-100} offsetYMax={100}>
                    <div />
                </Parallax>
            </MockProvider>,
            node
        );

        expect(controller.createElement).toBeCalledWith({
            elInner: expect.any(Object),
            elOuter: expect.any(Object),
            props: {
                disabled: false,
                offsetXMax: 0,
                offsetXMin: 0,
                offsetYMax: 100,
                offsetYMin: -100,
                slowerScrollRate: false,
            },
        });
    });

    it('to remove an element in the controller when unmounting', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init();
        controller.removeElement = jest.fn();

        let instance;
        ReactDOM.render(
            <MockProvider controllerMock={controller}>
                <Parallax ref={ref => (instance = ref)}>
                    <div />
                </Parallax>
            </MockProvider>,
            node
        );

        const element = instance.element;
        ReactDOM.unmountComponentAtNode(node);
        expect(controller.removeElement).toBeCalledWith(element);
    });

    it('to update an element in the controller when receiving relevant new props', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init();
        controller.updateElement = jest.fn();

        let instance;
        class StateChanger extends React.Component {
            state = { disabled: false };
            render() {
                return (
                    <Parallax {...this.state} ref={ref => (instance = ref)} />
                );
            }
        }

        let stateInstance;
        ReactDOM.render(
            <MockProvider controllerMock={controller}>
                <StateChanger ref={ref => (stateInstance = ref)} />
            </MockProvider>,
            node
        );

        const testProps = {
            disabled: true,
            offsetXMax: 100,
            offsetXMin: -100,
            offsetYMax: 100,
            offsetYMin: -100,
            slowerScrollRate: false,
        };

        // trigger an update
        stateInstance.setState(testProps);

        expect(controller.updateElement).toBeCalledWith(instance.element, {
            props: {
                ...testProps,
            },
        });

        // should not be called again
        stateInstance.setState({
            ...testProps,
            foo: false,
            bar: true,
        });

        expect(controller.updateElement).toHaveBeenCalledTimes(1);
    });

    it('to reset styles on an elment if the disabled prop is true', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init();
        controller.resetElementStyles = jest.fn();

        let instance;
        class StateChanger extends React.Component {
            state = { disabled: false };
            render() {
                return (
                    <Parallax {...this.state} ref={ref => (instance = ref)} />
                );
            }
        }

        let stateInstance;
        ReactDOM.render(
            <MockProvider controllerMock={controller}>
                <StateChanger ref={ref => (stateInstance = ref)} />
            </MockProvider>,
            node
        );

        stateInstance.setState({ disabled: true });

        expect(controller.resetElementStyles).toBeCalledWith(instance.element);
    });
});
