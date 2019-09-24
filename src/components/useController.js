import { useContext } from 'react';
import ParallaxContext from '../helpers/ParallaxContext';

export default () => {
    const parallaxController = useContext(ParallaxContext);

    if (!parallaxController) {
        throw new Error(
            'Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>'
        );
    }

    return { parallaxController };
};
