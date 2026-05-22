# AGENTS.md

Guide for coding agents working in the **react-scroll-parallax** repository.

## Project

- **Package:** `react-scroll-parallax` (v4 beta — WAAPI / ScrollTimeline)
- **Peer deps:** React 16.8+ / 17 / 18 / 19
- **Install (v4):** `npm install react-scroll-parallax@beta`
- **Build:** `pnpm build` (outputs to `dist/`)
- **Tests:** `pnpm test`

## Documentation for agents

Prefer machine-readable docs over scraping the site:

- Index: https://react-scroll-parallax.damnthat.tv/llms.txt
- Full bundle: https://react-scroll-parallax.damnthat.tv/llms-full.txt
- Per-page markdown: https://react-scroll-parallax.damnthat.tv/docs/v4/**/*.md

Current docs target **v4 beta**. v3 docs remain on the site via the version dropdown.

## Quick start

```tsx
import { ParallaxProvider, useParallax, Parallax } from 'react-scroll-parallax';

function App() {
  return (
    <ParallaxProvider>
      <MyContent />
    </ParallaxProvider>
  );
}

function MyContent() {
  const { ref } = useParallax({ speed: -10 });
  return (
    <>
      <div ref={ref}>Hook example</div>
      <Parallax speed={10}>
        <div>Component example</div>
      </Parallax>
    </>
  );
}
```

`<ParallaxProvider>` must wrap any tree that uses parallax hooks or components.

## Key API

| Topic | Doc |
| --- | --- |
| Setup | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/usage |
| All props | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/parallax-props |
| `useParallax` | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/hooks/use-parallax |
| `useParallaxController` | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/hooks/use-parallax-controller |
| `<Parallax>` | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/components/parallax-component |
| `<ParallaxBanner>` | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/components/parallax-banner-component |
| `<ParallaxProvider>` | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/components/parallax-provider |
| Next.js App Router | https://react-scroll-parallax.damnthat.tv/docs/v4/usage/next-13 |
| v3 → v4 migration | https://react-scroll-parallax.damnthat.tv/docs/v4/migration-guides/v3-migration-guide |

## Source layout

```
src/
  index.ts                 # Public exports
  hooks/                   # useParallax, useParallaxController
  components/
    Parallax/              # <Parallax> component
    ParallaxBanner/        # <ParallaxBanner>, ParallaxBannerLayer
    ParallaxProvider/      # Context provider
  context/ParallaxContext.ts
dist/                      # Build output (published to npm)
stories/                   # Storybook examples
documentation/             # Docusaurus docs site
```

Underlying scroll engine: [parallax-controller](https://parallax-controller.damnthat.tv/docs/v2/intro).

## Common pitfalls

1. **Missing provider** — hooks/components throw or no-op without `<ParallaxProvider>`.
2. **`<Parallax>` wrapper** — applies styles to its own wrapper `div`, not directly to children.
3. **Cache updates** — call `parallaxController.update()` after route changes, image loads, or layout shifts.
4. **Sticky elements** — parallax on sticky nodes causes issues; use `targetElement`, or fixed `startScroll` / `endScroll`.
5. **v4 easing** — `easing` must be valid CSS/WAAPI timing values (not legacy preset strings like `easeInQuad`).
6. **Horizontal scroll** — set `scrollAxis="horizontal"` on `<ParallaxProvider>`.
