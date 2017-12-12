import Subscribers from 'controllers/Subscribers.js';

describe('Expect Subscribers', () => {
    it('to set state', () => {
        const subscribers = new Subscribers();

        subscribers.setState({
            foo: () => {},
            bar: true,
        });

        expect(subscribers.state).toEqual({
            foo: expect.any(Function),
            bar: true,
        });
    });

    it('to add a subscriber', () => {
        const subscribers = new Subscribers();

        function callback(state) {
            const foo = state;
        }

        subscribers.subscribe(callback);

        expect(subscribers.subscriptions[0]).toEqual(callback);
    });

    it('to update a new subscriber with current state', () => {
        const subscribers = new Subscribers();

        let foo = false;
        function callback(state) {
            foo = state;
        }

        subscribers.setState({
            foo: 'bar',
        });
        subscribers.subscribe(callback);

        expect(foo).toEqual({
            foo: 'bar',
        });
    });

    it('to update a subscriber when state updates', () => {
        const subscribers = new Subscribers();

        let foo = false;
        function callback(state) {
            foo = state;
        }

        subscribers.setState({
            foo: false,
        });
        subscribers.subscribe(callback);
        subscribers.setState({
            foo: 'bar',
        });

        expect(foo).toEqual({
            foo: 'bar',
        });
    });

    it('to unsubscribe', () => {
        const subscribers = new Subscribers();

        function callback(state) {
            const foo = state;
        }

        subscribers.subscribe(callback);
        expect(subscribers.subscriptions[0]).toEqual(callback);

        subscribers.unsubscribe(callback);
        expect(subscribers.subscriptions.length).toEqual(0);
    });
});
