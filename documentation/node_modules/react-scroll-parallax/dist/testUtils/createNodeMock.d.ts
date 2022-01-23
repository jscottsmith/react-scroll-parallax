export default function createNodeMock(): {
    getBoundingClientRect: () => DOMRect;
    style: {
        transform: string;
    };
};
