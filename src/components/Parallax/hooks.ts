import { ParallaxController } from 'parallax-controller';
import { useEffect } from 'react';

export function useVerifyController(controller: ParallaxController) {
  useEffect(() => {
    // Make sure the provided controller is an instance of the Parallax Controller
    const isInstance = controller instanceof ParallaxController;
    // Throw if neither context or global is available
    if (!controller && !isInstance) {
      throw new Error(
        "Must wrap your application's <Parallax /> components in a <ParallaxProvider />."
      );
    }
  }, [controller]);
}
