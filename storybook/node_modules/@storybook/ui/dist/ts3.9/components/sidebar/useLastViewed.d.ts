import { Selection, StoryRef } from './types';
export declare const useLastViewed: (selection: Selection) => {
    getLastViewed: () => StoryRef[];
    clearLastViewed: () => void;
};
