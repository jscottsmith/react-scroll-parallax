/* global describe, it */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ScrollProvider, withScrollPosition } from 'react-scroll-parallax';

describe('withScrollPosition() higher order component', () => {
    it('provides a `scrollY` prop to a wrapped component', () => {
        const node = document.createElement('div');

        let testProps;

        const ScrollPosition = withScrollPosition(props => {
            testProps = props;
            return null;
        });

        ScrollPosition.propTypes = {
            scrollY: PropTypes.number, // isRequired is warning, not sure why.
        };

        ReactDOM.render(
            <ScrollProvider>
                <ScrollPosition />
            </ScrollProvider>,
            node
        );

        // Expected initial value
        expect(testProps.scrollY).toBe(0);
    });

    it('throws if not wrapped in a <ScrollProvider>', () => {
        const node = document.createElement('div');

        const ScrollPosition = withScrollPosition(() => {
            return null;
        });

        expect(() => {
            ReactDOM.render(<ScrollPosition />, node);
        }).toThrowError(
            "No scrollController exist in context. Must wrap your application's <Parallax> components in a <ScrollProvider />."
        );
    });
});
