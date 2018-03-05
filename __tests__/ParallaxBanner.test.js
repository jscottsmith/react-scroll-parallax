import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ParallaxBanner from 'components/ParallaxBanner';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'libs/ParallaxController';

// Workaround for refs
// See https://github.com/facebook/react/issues/7740
function createNodeMock() {
    const div = document.createElement('div');

    return {
        getBoundingClientRect: () => div.getBoundingClientRect(),
    };
}

describe('Expect the <ParallaxBanner> component', () => {
    afterEach(() => {});

    it('to render image banners correctly', () => {
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

    it('to render custom child banners correctly', () => {
        const tree = renderer
            .create(
                <ParallaxProvider>
                    <ParallaxBanner
                        className="test-class"
                        disabled={false}
                        layers={[
                            {
                                children: <div>test</div>,
                                amount: 0.2,
                                slowerScrollRate: false,
                            },
                        ]}
                        style={{
                            backgroundColor: 'blue',
                            border: '1px solid red',
                        }}
                    />
                </ParallaxProvider>,
                {
                    createNodeMock,
                }
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('to render without expanded margins', () => {
        const tree = renderer
            .create(
                <ParallaxProvider>
                    <ParallaxBanner
                        layers={[
                            {
                                children: <div>test</div>,
                                amount: 0.2,
                                expanded: false,
                            },
                        ]}
                    />
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

    it('to render layer children', () => {
        const node = document.createElement('div');

        let child = jest.fn();
        const Child = () => {
            child();
            return <div />;
        };

        ReactDOM.render(
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[
                        {
                            children: <Child />,
                            amount: 0.2,
                            slowerScrollRate: false,
                        },
                    ]}
                />
            </ParallaxProvider>,
            node
        );

        expect(child).toBeCalled();
    });

    it('to render layer children', () => {
        const node = document.createElement('div');

        let child = jest.fn();
        const Child = () => {
            child();
            return <div />;
        };

        ReactDOM.render(
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[
                        {
                            children: <Child />,
                            amount: 0.2,
                            slowerScrollRate: false,
                        },
                    ]}
                />
            </ParallaxProvider>,
            node
        );

        expect(child).toBeCalled();
    });
});
