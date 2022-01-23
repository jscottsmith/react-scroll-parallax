import { FC } from 'react';
declare type Level = 'section' | 'subsection';
export interface SectionRowProps {
    label: string;
    level: Level;
    initialExpanded?: boolean;
    colSpan: number;
}
export declare const SectionRow: FC<SectionRowProps>;
export {};
