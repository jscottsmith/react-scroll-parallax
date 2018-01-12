import React from 'react';
import ReactDOM from 'react-dom';
import Parallax from 'components/Parallax';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'libs/ParallaxController';

const log = global.console.log;

describe('Expect the <Parallax> component', () => {

    afterEach(() => {
        global.console.log = log;
        global.ParallaxController = undefined;
    });

    it('to throw if the ParallaxController is not available', () => {
        const node = document.createElement('div');

        const render = () => {
            ReactDOM.render(
                <Parallax>
                    <div />
                </Parallax>,
                node
            );
        };

        expect(render).toThrow(
            'Must wrap your application\'s <Parallax /> components in a <ParallaxProvider />.'
        );
    });

    it('to warn if the ParallaxController is found but not provided by <ParallaxProvider>', () => {
        const node = document.createElement('div');

        global.console.log = jest.fn();
        global.ParallaxController = ParallaxController.init();

        const render = () => {
            ReactDOM.render(
                <Parallax>
                    <div />
                </Parallax>,
                node
            );
        };

        render();

        expect(global.console.log).toBeCalledWith(
            'Calling ParallaxController.init() has been deprecated in favor of using the <ParallaxProvider /> component. For usage details see: https://github.com/jscottsmith/react-scroll-parallax/tree/v1.1.0#usage'
        );
    });

    it('to create an element in the controller on mount', () => {
        const node = document.createElement('div');

        global.ParallaxController = ParallaxController.init();
        global.ParallaxController.createElement = jest.fn();
        const spy = global.ParallaxController.createElement;

        const render = () => {
            ReactDOM.render(
                <ParallaxProvider>
                    <Parallax offsetYMin={-100} offsetYMax={100}> 
                        <div />
                    </Parallax>
                </ParallaxProvider>,
                node
            );
        };

        render();

        expect(spy).toBeCalledWith({
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

        global.ParallaxController = ParallaxController.init();
        global.ParallaxController.removeElement = jest.fn();
        const spy = global.ParallaxController.removeElement;

        let instance;
        const render = () => {
            ReactDOM.render(
                <ParallaxProvider>
                    <Parallax ref={ref => instance = ref}> 
                        <div />
                    </Parallax>
                </ParallaxProvider>,
                node
            );
        };

        render();
        const element = instance.element;
        ReactDOM.unmountComponentAtNode(node);
        expect(spy).toBeCalledWith(element);
    });

    it('to update an element in the controller when receiving new props and disable an element if the disable prop is true', () => {
        const node = document.createElement('div');

        global.ParallaxController = ParallaxController.init();
        global.ParallaxController.updateElement = jest.fn();
        global.ParallaxController.resetElementStyles = jest.fn();
        
        let instance;

        class StateChanger extends React.Component {
            state = { disabled: false };

            componentDidMount() {
                this.setState({ disabled: true });
            }

            render() {
                return (
                    <Parallax disabled={this.state.disabled} ref={ref => instance = ref} />
                );
            }
        }

        const render = () => {
            ReactDOM.render(
                <ParallaxProvider>
                    <StateChanger />
                </ParallaxProvider>,
                node
            );
        };

        render();

        expect(global.ParallaxController.updateElement).toBeCalledWith(instance.element, {
            props: {
                disabled: instance.props.disabled,
                offsetXMax: instance.props.offsetXMax,
                offsetXMin: instance.props.offsetXMin,
                offsetYMax: instance.props.offsetYMax,
                offsetYMin: instance.props.offsetYMin,
                slowerScrollRate: instance.props.slowerScrollRate,
            },
        });

        expect(global.ParallaxController.resetElementStyles).toBeCalledWith(instance.element);
    });
});