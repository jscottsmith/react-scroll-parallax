// this file doesn't actually run with the test runner. it is just used to
// verify the typings work as expected
import * as React from 'react';
import { withController, WithControllerInjectedProps } from '../../src';

describe('typescript tests: withController', () => {
    it("has an error because the `TestProps` don't include `parallaxController`", () => {
        interface TestProps {
            foo: string;
        }

        function TestComponent({  }: TestProps) {
            return null;
        }

        // expect TS error here
        withController(TestComponent);
    });

    it("doesn't error if `TestProps` include `parallaxController`", () => {
        interface TestProps extends WithControllerInjectedProps {
            foo: string;
        }

        function TestComponent({  }: TestProps) {
            return null;
        }

        // should _not_ have an error
        withController(TestComponent);
    });

    it('removes the `parallaxController` prop from the wrapped component', () => {
        interface TestProps extends WithControllerInjectedProps {
            foo: string;
        }

        function TestComponent({ foo }: TestProps) {
            return null;
        }

        const Enhanced = withController(TestComponent);

        // should _not_ have an error because the prop `parallaxController` was removed
        const x = <Enhanced foo="test" />;
    });
});
