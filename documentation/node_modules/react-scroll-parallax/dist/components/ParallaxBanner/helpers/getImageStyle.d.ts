import { BannerLayer } from '../types';
export declare function getImageStyle(layer: BannerLayer): {
    backgroundImage: string;
    backgroundPosition: string;
    backgroundSize: string;
} | {
    backgroundImage?: undefined;
    backgroundPosition?: undefined;
    backgroundSize?: undefined;
};
