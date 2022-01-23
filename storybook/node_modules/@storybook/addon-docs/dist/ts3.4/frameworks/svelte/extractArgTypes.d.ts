import { StrictArgTypes } from '@storybook/csf';
import { SvelteComponentDoc } from 'sveltedoc-parser/typings';
import { ArgTypesExtractor } from '../../lib/docgen';
export declare const extractArgTypes: ArgTypesExtractor;
export declare const createArgTypes: (docgen: SvelteComponentDoc) => StrictArgTypes<import("@storybook/csf").Args>;
