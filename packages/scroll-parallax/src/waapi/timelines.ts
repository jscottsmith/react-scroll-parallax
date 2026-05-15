import type { ScrollTimelineCtor, ViewTimelineCtor } from './support';

export function buildScrollTimeline(
  ScrollTimeline: ScrollTimelineCtor | undefined,
  options: {
    source: globalThis.Element;
    axis: string;
    startScroll: number;
    endScroll: number;
  }
): AnimationTimeline | null {
  if (!ScrollTimeline) {
    return null;
  }
  return new ScrollTimeline({
    source: options.source,
    axis: options.axis,
    scrollOffsets: [
      CSS.px(options.startScroll),
      CSS.px(options.endScroll),
    ],
  });
}

export function buildViewTimeline(
  ViewTimeline: ViewTimelineCtor | undefined,
  options: { subject: globalThis.Element; axis: string }
): AnimationTimeline | null {
  if (!ViewTimeline) {
    return null;
  }
  return new ViewTimeline({ subject: options.subject, axis: options.axis });
}
