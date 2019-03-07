import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ParallaxBanner from 'components/ParallaxBanner';
import ParallaxProvider from 'components/ParallaxProvider';
import createNodeMock from './testUtils/createNodeMock';

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

        const child = jest.fn();
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

        const childFn = jest.fn();
        const Child = () => {
            childFn();
            return <div />;
        };

        ReactDOM.render(
            <ParallaxProvider>
                <ParallaxBanner
                    layers={[
                        {
                            children: <Child />,
                            amount: 0.2,
                        },
                    ]}
                />
            </ParallaxProvider>,
            node
        );

        expect(childFn).toBeCalled();
    });
});
