---
sidebar_label: View timelines & scroll containers
sidebar_position: 3
---

# View timelines and scroll containers

When parallax runs on the **view path** (no numeric `startScroll` / `endScroll`), the library drives motion with the Web Animations API using a [`ViewTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline). That API ties progress to how the **subject** element moves through a **scrollport**. If that scrollport is not the same surface the user actually scrolls, effects can look wrong: progress may barely move, feel stretched across the whole page, or stay pinned.

This page explains why that happens and how to avoid it.

## Two different ways the library picks a scroller

### Scroll path (`startScroll` + `endScroll`)

A [`ScrollTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline) is created with an explicit **source**: the controller’s `scrollContainer` when one is set, otherwise `document.documentElement`. Progress matches that element’s scroll offsets.

### View path (default for translate / rotate without scroll offsets)

A `ViewTimeline` is created with a **subject** (the parallax element, or `targetElement` when set) and axis options. The browser chooses the timeline’s scrollport from the subject’s **nearest ancestor scroll container**, not from `ParallaxProvider`’s `scrollContainer` prop. There is currently no constructor option in our integration to force that scrollport to match `ScrollTimeline`’s source.

So: **scroll-linked keyframes can be driven by a different scroller than the one your layout and `Rect` / `View` math assume**, whenever an intermediate ancestor establishes its own scroll container.

## What creates a “wrong” nearest scroll container?

Any ancestor between the subject and the real scrolling viewport can become the timeline’s scrollport if it is a [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container). Common cases:

- **`overflow: hidden`** — still establishes a scroll container in CSS. The user may scroll the document while `ViewTimeline` associates the subject with this non-scrolling (or differently sized) box.
- **`overflow: auto` / `scroll`** on a wrapper, sidebar, or modal.
- **Nested scroll areas** where the subject lives inside a div that scrolls, but your `ParallaxProvider` is bound to `window` or another element.

A tall wrapper (for example `min-height: 300vh` plus `overflow: hidden`) is a frequent Storybook / demo pattern: it creates scroll height on the document **and** a scroll container around the content. Document scrolling can look fine to the eye while `ViewTimeline` progress is tied to the inner box, which breaks entry/exit timing.

## Subject size

The subject is the box whose visibility phases (`entry` / `exit`) drive the timeline. If `targetElement` points at a **large** wrapper (or a flex item that stretches to full column height), the visible “pass” through the scrollport is long, so the animation can feel like it spans the **entire scrollable page** even when the scrollport is correct.

## Mitigations

1. **Avoid extra scroll containers** between the parallax node and the scroller you care about. Prefer `overflow: visible` on decorative wrappers, or use [`overflow: clip`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#clip) when you only need clipping and do not want the same scroll-container behavior as `hidden` (verify in your target browsers).
2. **Use the scroll path** when you need a guaranteed scroller: set numeric `startScroll` and `endScroll` so the library uses `ScrollTimeline` with the same source as `getScrollSource()` / your provider’s `scrollContainer`.
3. **Keep the subject small** — the animated/ref element (or `targetElement`) should match the visual block you want to enter and exit the viewport.
4. **Align structure with `scrollContainer`** — if the user scrolls a specific element, parallax subjects should live in that subtree without a closer scroll container that steals `ViewTimeline`’s association.

## Future direction

Specifications and browsers may add a stable way to set the `ViewTimeline` scroller explicitly (for example a `source`-style option). Until then, layout and overflow around the subject are part of the public contract for view-driven parallax.
