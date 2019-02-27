import Rect from 'classes/Rect';
import { createElementMock } from './testUtils/createElementMock';
describe.each([
    [
        createElementMock(
            { offsetWidth: 400, offsetHeight: 400 },
            {
                getBoundingClientRect: () => ({
                    top: 500,
                    left: 200,
                    bottom: 700,
                    right: 900,
                }),
            }
        ),
        { width: 1024, height: 769 },
        { x: 0, y: 0 },
        {
            height: 400,
            width: 400,
            left: 200,
            right: 900,
            top: 500,
            bottom: 700,
            originTotalDistY: 1169,
            originTotalDistX: 1424,
        },
    ],
    [
        createElementMock(
            { offsetWidth: 100, offsetHeight: 100 },
            {
                getBoundingClientRect: () => ({
                    top: 500,
                    left: 200,
                    bottom: 600,
                    right: 300,
                }),
            }
        ),
        { width: 2000, height: 1000 },
        { x: 0, y: 689 },
        {
            height: 100,
            width: 100,
            left: 200,
            right: 300,
            top: 1189,
            bottom: 1289,
            originTotalDistY: 1100,
            originTotalDistX: 2100,
        },
    ],
    [
        createElementMock(
            { offsetWidth: 100, offsetHeight: 100 },
            {
                getBoundingClientRect: () => ({
                    top: 500,
                    left: 200,
                    bottom: 600,
                    right: 300,
                }),
            }
        ),
        {
            width: 2000,
            height: 1000,
            scrollContainer: createElementMock(
                { offsetWidth: 500, offsetHeight: 500 },
                {
                    getBoundingClientRect: () => ({
                        top: 100,
                        left: 100,
                        bottom: 600,
                        right: 600,
                    }),
                }
            ),
        },
        { x: 0, y: 689 },
        {
            height: 100,
            width: 100,
            left: 100,
            right: 200,
            top: 1089,
            bottom: 1189,
            originTotalDistY: 1100,
            originTotalDistX: 2100,
        },
    ],
])('Rect()', (element, view, scroll, expected) => {
    test(`returns expected Rect based on element, view, and scroll`, () => {
        expect(new Rect(element, view, scroll)).toEqual(
            expect.objectContaining(expected)
        );
    });
});
