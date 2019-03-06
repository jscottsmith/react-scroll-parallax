export default function validHTMLElement(
    props,
    propName,
    componentName = 'ANONYMOUS'
) {
    if (typeof window === 'undefined') {
        return null;
    }

    if (props[propName]) {
        const value = props[propName];
        const isValid = value instanceof window.Element;

        if (!isValid) {
            return new Error(
                `Prop name "${propName}" in <${componentName}> must be an HTML DOM element.`
            );
        }
    }

    return null;
}
