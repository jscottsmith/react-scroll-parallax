import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ParallaxBanner from 'components/ParallaxBanner';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'libs/ParallaxController';

describe('Expect the <ParallaxBanner> component', () => {
    afterEach(() => {});

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
                    <ParallaxBanner
                        className="test-class"
                        disabled={false}
                        layers={[
                            {
                                image: 'https://foo.com/bar.jpg',
                                amount: 0.2,
                                slowerScrollRate: false,
                            },
                        ]}
                        style={{
                            backgroundColor: 'blue',
                            border: '1px solid red',
                        }}
                    >
                        <div>
                            <h1>Foo Bar</h1>
                        </div>
                    </ParallaxBanner>
                </ParallaxProvider>,
                {
                    createNodeMock,
                }
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('to render children', () => {
        const node = document.createElement('div');

        let child = jest.fn();
        const Child = () => {
            child();
            return <div />;
        };

        ReactDOM.render(
            <ParallaxProvider>
                <ParallaxBanner layers={[]}>
                    <Child />
                </ParallaxBanner>
            </ParallaxProvider>,
            node
        );

        expect(child).toBeCalled();
    });
});
