/* global describe, it */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ScrollProvider, ScrollController } from 'react-scroll-parallax';
import renderer from 'react-test-renderer';

describe('A <ScrollProvider>', () => {
    it('to render children', () => {
        const component = renderer.create(
            <ScrollProvider>
                <img src="foo" alt="bar" />
            </ScrollProvider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('to pass context', () => {
        const node = document.createElement('div');

        let rootContext;
        const ContextChecker = (props, context) => {
            rootContext = context;
            return null;
        };

        const testController = ScrollController.init();

        ContextChecker.contextTypes = {
            scrollController: PropTypes.shape({
                destroy: PropTypes.func.isRequired,
                subscribe: PropTypes.func.isRequired,
                unsubscribe: PropTypes.func.isRequired,
            }),
        };

        // afterEach(() => {
        //     rootContext = undefined;
        // });

        ReactDOM.render(
            <ScrollProvider>
                <ContextChecker />
            </ScrollProvider>,
            node
        );

        // Expected methods and state
        expect(rootContext.scrollController.state.scrollY).toBe(0);
        expect(rootContext.scrollController.subscribe).toBe(
            testController.subscribe
        );
        expect(rootContext.scrollController.unsubscribe).toBe(
            testController.unsubscribe
        );
        expect(rootContext.scrollController.destroy).toBe(
            testController.destroy
        );
    });
});
