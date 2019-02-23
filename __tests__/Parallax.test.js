import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import Parallax from 'components/Parallax';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'classes/ParallaxController';
import MockProvider from './testUtils/MockProvider';
import expectRenderError from './testUtils/expectRenderError';
import createNodeMock from './testUtils/createNodeMock';
import { VERTICAL } from 'constants';

const consoleLog = global.console.log;

describe('Expect the <Parallax> component', () => {
    const preventError = e => e.preventDefault();

    beforeEach(() => {
        window.addEventListener('error', preventError);
    });

    afterEach(() => {
        global.console.log = consoleLog;
        global.ParallaxController = undefined;

        window.removeEventListener('error', preventError);
    });

    it('to render correctly', () => {
        const tree = TestRenderer.create(
            <ParallaxProvider>
                <Parallax
                    className="class-foo"
                    disabled={false}
                    x={[-100, 100]}
                    y={['-100%', '100%']}
                    styleOuter={{
                        border: 'solid red 2px',
                    }}
                    styleInner={{
                        border: 'solid blue 2px',
                    }}
                    tagOuter="figure"
                    tagInner="div"
                >
                    <div className="foo" />
                </Parallax>
            </ParallaxProvider>,
            {
                createNodeMock,
            }
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('to throw if the ParallaxController is not available', () => {
        expectRenderError(
            <Parallax>
                <div />
            </Parallax>,
            "Must wrap your application's <Parallax /> components in a <ParallaxProvider />.",
            2 // 2 errors because of error removing element on unmount
        );
    });

    it('to create an element in the controller on mount', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
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
            props: { disabled: false, x0: 0, x1: 0, y0: 0, y1: 0 },
        });
    });

    it('to remove an element in the controller when unmounting', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        controller.removeElementById = jest.fn();

        ReactDOM.render(
            <MockProvider controllerMock={controller}>
                <Parallax>
                    <div />
                </Parallax>
            </MockProvider>,
            node
        );
        const element = controller.getElements()[0];
        ReactDOM.unmountComponentAtNode(node);
        expect(controller.removeElementById).toBeCalledWith(element.id);
    });

    it('to update an element in the controller when receiving relevant new props', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        controller.updateElementPropsById = jest.fn();

        class StateChanger extends React.Component {
            state = { disabled: false };
            render() {
                return <Parallax {...this.state} />;
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
            x: [100, -100],
            y: [-100, 100],
        };

        // trigger an update
        stateInstance.setState(testProps);
        const element = controller.getElements()[0];

        expect(controller.updateElementPropsById).toBeCalledWith(element.id, {
            disabled: true,
            x0: 100,
            x1: -100,
            y0: -100,
            y1: 100,
        });

        // should not be called again
        stateInstance.setState({
            ...testProps,
            foo: false,
            bar: true,
        });

        expect(controller.updateElementPropsById).toHaveBeenCalledTimes(1);
    });

    it('to reset styles on an element if the disabled prop is true', () => {
        const node = document.createElement('div');

        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        controller.resetElementStyles = jest.fn();

        class StateChanger extends React.Component {
            state = { disabled: false };
            render() {
                return <Parallax {...this.state} />;
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

        expect(controller.resetElementStyles).toBeCalled();
    });
});
