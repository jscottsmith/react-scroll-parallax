import React from 'react';
import ReactDOM from 'react-dom';
import withController from 'components/withController';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'modules/ParallaxController';

describe('Expect the withController HoC', () => {
    it('to provide the controller to a component as a prop', () => {
        const node = document.createElement('div');

        let controllerContext = null;

        const MyComponent = ({ parallaxController }) => {
            controllerContext = parallaxController;
            return null;
        };

        const WithControllerContext = withController(MyComponent);

        const render = () => {
            ReactDOM.render(
                <ParallaxProvider>
                    <WithControllerContext />
                </ParallaxProvider>,
                node
            );
        };

        render();

        expect(controllerContext).toBeInstanceOf(ParallaxController);
        expect(controllerContext).toEqual(
            expect.objectContaining({
                getElements: expect.any(Function),
                createElement: expect.any(Function),
                removeElement: expect.any(Function),
                updateElement: expect.any(Function),
                resetElementStyles: expect.any(Function),
                update: expect.any(Function),
                destroy: expect.any(Function),
            })
        );
    });

    it('to fail and not provide the controller if not wrapped in a ParallaxProvider', () => {
        const node = document.createElement('div');

        let controllerContext = null;

        const MyComponent = ({ parallaxController }) => {
            controllerContext = parallaxController;
            return null;
        };

        const WithControllerContext = withController(MyComponent);

        const render = () => {
            ReactDOM.render(<WithControllerContext />, node);
        };

        render();

        expect(controllerContext).toEqual(null);
    });
});
