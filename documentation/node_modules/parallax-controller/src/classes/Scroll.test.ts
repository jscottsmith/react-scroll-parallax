import { Scroll } from './Scroll';

describe('Expect the Scroll class', () => {
  it('to construct', () => {
    const scroll = new Scroll(10, 50);
    expect(scroll.x).toBe(10);
    expect(scroll.y).toBe(50);
    expect(scroll.dx).toBe(0);
    expect(scroll.dy).toBe(0);
  });

  it('to set scroll and return the instance', () => {
    const scroll = new Scroll(9, 8);
    const instance = scroll.setScroll(10, 12);
    expect(instance.x).toBe(10);
    expect(instance.y).toBe(12);
    expect(instance).toBeInstanceOf(Scroll);
  });

  it('to set delta values from last scroll', () => {
    const scroll = new Scroll(9, 8);
    const instance = scroll.setScroll(10, 12);
    expect(scroll.dx).toBe(1);
    expect(scroll.dy).toBe(4);
    scroll.setScroll(0, 0);
    expect(scroll.dx).toBe(-10);
    expect(scroll.dy).toBe(-12);
    expect(instance).toBeInstanceOf(Scroll);
  });
});
