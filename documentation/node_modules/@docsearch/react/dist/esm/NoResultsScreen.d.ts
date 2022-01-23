/// <reference types="react" />
import type { ScreenStateProps } from './ScreenState';
import type { InternalDocSearchHit } from './types';
export declare type NoResultsScreenTranslations = Partial<{
    noResultsText: string;
    suggestedQueryText: string;
    openIssueText: string;
    openIssueLinkText: string;
}>;
declare type NoResultsScreenProps = Omit<ScreenStateProps<InternalDocSearchHit>, 'translations'> & {
    translations?: NoResultsScreenTranslations;
};
export declare function NoResultsScreen({ translations, ...props }: NoResultsScreenProps): JSX.Element;
export {};
