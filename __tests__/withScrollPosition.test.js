/* global describe, it */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ScrollProvider, withScrollPosition } from 'index';

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
});
