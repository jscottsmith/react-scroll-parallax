/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
/*
Minimal implementation of a React interpolate component.
We don't ship a markdown parser nor a feature-complete i18n library on purpose.
More details here: https://github.com/facebook/docusaurus/pull/4295
*/
const ValueRegexp = /{\w+}/g;
const ValueFoundMarker = '{}'; // does not care much
export function interpolate(text, values) {
    const elements = [];
    const processedText = text.replace(ValueRegexp, (match) => {
        // remove {{ and }} around the placeholder
        const key = match.substring(1, match.length - 1);
        const value = values === null || values === void 0 ? void 0 : values[key];
        if (typeof value !== 'undefined') {
            const element = React.isValidElement(value)
                ? value
                : // For non-React elements: basic primitive->string conversion
                    String(value);
            elements.push(element);
            return ValueFoundMarker;
        }
        else {
            return match; // no match? add warning?
        }
    });
    // No interpolation to be done: just return the text
    if (elements.length === 0) {
        return text;
    }
    // Basic string interpolation: returns interpolated string
    else if (elements.every((el) => typeof el === 'string')) {
        return processedText
            .split(ValueFoundMarker)
            .reduce((str, value, index) => { var _a; return str.concat(value).concat((_a = elements[index]) !== null && _a !== void 0 ? _a : ''); }, '');
    }
    // JSX interpolation: returns ReactNode
    else {
        return processedText.split(ValueFoundMarker).reduce((array, value, index) => [
            ...array,
            React.createElement(React.Fragment, { key: index },
                value,
                elements[index]),
        ], []);
    }
}
export default function Interpolate({ children, values, }) {
    if (typeof children !== 'string') {
        console.warn('Illegal <Interpolate> children', children);
        throw new Error('The Docusaurus <Interpolate> component only accept simple string values');
    }
    return interpolate(children, values);
}
