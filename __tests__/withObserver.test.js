/* global describe, it */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withObserver } from 'react-scroll-parallax';

describe('withObserver() higher order component', () => {
    const node = document.createElement('div');
    const ref = document.createElement('div');

    it("throws if the browser doesn't support the Intersection Observer API", () => {
        const Observed = withObserver(() => null);

        expect(() => {
            ReactDOM.render(<Observed getRef={() => ref} />, node);
        }).toThrowError(
            'Must provide an IntersectionObserver polyfill for browsers that do not yet support the technology.'
        );
    });

    it('provides an `isInView` prop to a wrapped component', () => {
        require('intersection-observer');

        let testProps;

        const Observed = withObserver(props => {
            testProps = props;
            return null;
        });

        Observed.propTypes = {
            isInView: PropTypes.bool.isRequired,
        };

        ReactDOM.render(<Observed getRef={() => ref} />, node);

        expect(testProps.isInView).toBe(true);
    });

    it('requires a `getRef` prop func', () => {
        const Observed = withObserver(() => null);

        Observed.propTypes = {
            isInView: PropTypes.bool.isRequired,
        };

        expect(() => {
            ReactDOM.render(<Observed />, node);
        }).toThrowError();
    });
});
