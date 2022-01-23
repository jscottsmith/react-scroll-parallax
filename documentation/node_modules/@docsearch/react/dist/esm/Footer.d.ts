/// <reference types="react" />
export declare type FooterTranslations = Partial<{
    selectText: string;
    navigateText: string;
    closeText: string;
    searchByText: string;
}>;
declare type FooterProps = Partial<{
    translations: FooterTranslations;
}>;
export declare function Footer({ translations }: FooterProps): JSX.Element;
export {};
