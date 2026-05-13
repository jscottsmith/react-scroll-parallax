# Usage with Next.js

This guide will show you how to set up `react-scroll-parallax` using the [Next 13](https://nextjs.org/blog/next-13) App router.

## Setting Up the ParallaxProvider

[Next 13](https://nextjs.org/blog/next-13) requires client components to be marked with `use client`, and the `ParallaxProvider` is a client component. To use the providers in your app, first create a `providers.tsx` file in the root of the app directory:

```
next-app
└── app/
    └── providers.tsx
```

In this file, wrap the children in a `<ParallaxProvider>` and mark it as a client component.

:::info
You may add any additional providers you need for your app here in the future.
:::

```tsx
'use client';

import { ParallaxProvider } from 'react-scroll-parallax';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
```

### Add the Providers to the Root Layout

In the `layout.tsx` file at the root of the app directory, import the `Providers` component you just created and wrap it around the children.

```
next-app
└── app/
    ├── providers.tsx
    └── layout.tsx
```

Your layout may differ from the one below — it's simplified for this example.

```tsx
import { Providers } from './Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Create a Parallax Effect

Next, we can create a simple parallax effect in another client component. Add a `test.tsx` file and place a parallax effect within it. We must also make this a client component with `use client`.

```
next-app
└── app/
    ├── providers.tsx
    ├── layout.tsx
    ├── test.tsx
    └── page.tsx
```

```tsx
'use client';

import { Parallax } from 'react-scroll-parallax';

export default function Test() {
  return (
    <Parallax scale={[1, 0]}>
      <div className="w-48 h-48 bg-red-500" />
    </Parallax>
  );
}
```

### Use the Parallax within a Page

To add parallax effects to a page, create a `page.tsx` at the route you need. In this example, we'll use the homepage, so the page exists at the root of the app directory.

```
next-app
└── app/
    ├── providers.tsx
    ├── layout.tsx
    └── page.tsx
```

Add the `<Test>` component and style the page so it scrolls.

```tsx
import Test from './Test';

export default function Page() {
  return (
    <main className="flex min-h-[300vh] flex-col items-center justify-between p-24">
      <Test />
    </main>
  );
}
```

That's it! Now that `react-scroll-parallax` is working in your Next.js application, you can add your own effects. See more on [how it works](/docs/examples/how-it-works).
