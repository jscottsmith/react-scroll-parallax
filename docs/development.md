# Development

Scripts and procedures for developing locally.

## Getting started

Install node modules

```
pnpm install
```

Start storybook

```
pnpm start
```

## Testing

Run Vitest tests

```
pnpm test
```

## Prettier

Run prettier on source files

```
pnpm prettier
```

## Publishing New Version to NPM

Use `np`

```bash
npx np
```

## Scroll-driven animations (`ViewTimeline`)

If you use scroll-linked WAAPI with the view path (no `startScroll` / `endScroll`), layout and `overflow` on ancestors can change which element the browser treats as the timeline scrollport. Read [View timelines and scroll containers](../apps/docs/docs/scroll-parallax/view-timeline-scroll-containers.md) in the doc site source before debugging Storybook or nested layouts.
