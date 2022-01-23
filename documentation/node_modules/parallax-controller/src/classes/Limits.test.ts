import { Limits } from './Limits';

describe('Limits', () => {
  test(`sets properties from constructor`, () => {
    const limits = new Limits({
      startX: 100,
      startY: 300,
      endX: 600,
      endY: 900,
    });
    expect(limits.startX).toBe(100);
    expect(limits.startY).toBe(300);
    expect(limits.endX).toBe(600);
    expect(limits.endY).toBe(900);
    expect(limits.totalX).toBe(500);
    expect(limits.totalY).toBe(600);
    expect(limits.startMultiplierX).toBe(1);
    expect(limits.endMultiplierX).toBe(1);
    expect(limits.startMultiplierY).toBe(1);
    expect(limits.endMultiplierY).toBe(1);
  });

  test(`sets start and end multipliers when provided`, () => {
    const limits = new Limits({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      startMultiplierX: 1.1,
      endMultiplierX: 1.2,
      startMultiplierY: 1.3,
      endMultiplierY: 1.4,
    });
    expect(limits.startX).toBe(0);
    expect(limits.startY).toBe(0);
    expect(limits.endX).toBe(0);
    expect(limits.endY).toBe(0);
    expect(limits.totalX).toBe(0);
    expect(limits.totalY).toBe(0);
    expect(limits.startMultiplierX).toBe(1.1);
    expect(limits.endMultiplierX).toBe(1.2);
    expect(limits.startMultiplierY).toBe(1.3);
    expect(limits.endMultiplierY).toBe(1.4);
  });
});
