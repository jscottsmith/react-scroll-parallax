# Installation
> `npm install --save @types/pretty-hrtime`

# Summary
This package contains type definitions for pretty-hrtime (https://github.com/robrich/pretty-hrtime).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/pretty-hrtime.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/pretty-hrtime/index.d.ts)
````ts
// Type definitions for pretty-hrtime 1.0
// Project: https://github.com/robrich/pretty-hrtime
// Definitions by: BendingBender <https://github.com/BendingBender>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = prettyHrtime;

declare function prettyHrtime(hrTime: [number, number], options?: prettyHrtime.Options): string;

declare namespace prettyHrtime {
    interface Options {
        verbose?: boolean | undefined;
        precise?: boolean | undefined;
    }
}

````

### Additional Details
 * Last updated: Wed, 07 Jul 2021 17:02:36 GMT
 * Dependencies: none
 * Global values: none

# Credits
These definitions were written by [BendingBender](https://github.com/BendingBender).
