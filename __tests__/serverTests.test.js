/**
 * @jest-environment node
 */

import React from 'react';

import ReactDOMServer from 'react-dom/server';
import ParallaxProvider from 'components/ParallaxProvider';
import ParallaxController from 'modules/ParallaxController';

describe('Expect', () => {
    it('<ParallaxProvider> to not init the controller on the server', () => {
        const serverRender = () =>
            ReactDOMServer.renderToString(
                <ParallaxProvider>{'string'}</ParallaxProvider>
            );

        expect(() => serverRender()).not.toThrow();
    });

    it('ParallaxController to throw if init on the server', () => {
        const serverRender = () => ParallaxController.init();

        expect(serverRender).toThrowError(
            'Looks like ParallaxController.init() was called on the server. This method must be called on the client.'
        );
    });
});
