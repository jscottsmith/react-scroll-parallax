import { View } from './View';

describe('Expect the View class', () => {
  it('to construct', () => {
    const div = document.createElement('div');
    const view = new View({
      width: 100,
      height: 150,
      scrollWidth: 100,
      scrollHeight: 3000,
      scrollContainer: div,
    });
    expect(view).toMatchObject({
      width: 100,
      height: 150,
      scrollContainer: div,
    });
  });

  it('to set size return the instance', () => {
    const div = document.createElement('div');
    const view = new View({
      width: 100,
      height: 150,
      scrollWidth: 100,
      scrollHeight: 3000,
      scrollContainer: div,
    });
    const instance = view.setSize({
      width: 400,
      height: 250,
      scrollWidth: 400,
      scrollHeight: 4000,
    });
    expect(instance).toMatchObject({
      width: 400,
      height: 250,
      scrollWidth: 400,
      scrollHeight: 4000,
      scrollContainer: div,
    });
    expect(instance).toBeInstanceOf(View);
  });
});
