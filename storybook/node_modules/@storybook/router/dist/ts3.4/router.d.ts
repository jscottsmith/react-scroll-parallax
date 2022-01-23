import { ReactNode } from 'react';
import { BrowserRouter, useNavigate, NavigateOptions, Router } from 'react-router-dom';
import { StoryData } from './utils';
interface Other extends StoryData {
    path: string;
    singleStory?: boolean;
}
export declare type RouterData = {
    location: Partial<Location>;
    navigate: ReturnType<typeof useQueryNavigate>;
} & Other;
export declare type RenderData = Pick<RouterData, 'location'> & Other;
interface MatchingData {
    match: null | {
        path: string;
    };
}
interface QueryLocationProps {
    children: (renderData: RenderData) => ReactNode;
}
interface QueryMatchProps {
    path: string;
    startsWith: boolean;
    children: (matchingData: MatchingData) => ReactNode;
}
interface RouteProps {
    path: string;
    startsWith?: boolean;
    hideOnly?: boolean;
    children: ReactNode;
}
export interface QueryLinkProps {
    to: string;
    children: ReactNode;
}
declare type ExpandedNavigateOptions = NavigateOptions & {
    plain?: boolean;
};
declare const useQueryNavigate: () => (to: string | number, options?: ExpandedNavigateOptions) => void;
declare const QueryLink: {
    ({ to, children, ...rest }: QueryLinkProps): JSX.Element;
    displayName: string;
};
declare const QueryLocation: {
    ({ children }: QueryLocationProps): JSX.Element;
    displayName: string;
};
declare const QueryMatch: {
    ({ children, path: targetPath, startsWith }: QueryMatchProps): JSX.Element;
    displayName: string;
};
declare const Route: {
    ({ path, children, startsWith, hideOnly }: RouteProps): JSX.Element;
    displayName: string;
};
export { QueryLink as Link };
export { QueryMatch as Match };
export { QueryLocation as Location };
export { Route };
export { useQueryNavigate as useNavigate };
export { BrowserRouter as LocationProvider };
export { Router as BaseLocationProvider };
export { useNavigate as usePlainNavigate };
export { ExpandedNavigateOptions as NavigateOptions };
