import React from 'react';
import PropTypes from 'prop-types';

declare const Welcome: {
    ({ showApp }: {
        showApp: () => void;
    }): JSX.Element;
    displayName: string;
    propTypes: {
        showApp: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        showApp: any;
    };
};

declare const Button: {
    ({ children, onClick, }: {
        children: React.ReactNode;
        onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }): JSX.Element;
    displayName: string;
    propTypes: {
        children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        onClick: () => void;
    };
};

export { Welcome, Button };
