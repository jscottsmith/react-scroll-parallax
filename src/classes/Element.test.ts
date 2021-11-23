import { Element } from './Element';
import { View } from './View';
import { Scroll } from './Scroll';
import { createElementMock } from '../testUtils/createElementMock';
import { ScrollAxis } from '../types';

const DEFAULT_OPTIONS = {
  elInner: document.createElement('div'),
  elOuter: document.createElement('div'),
  scrollAxis: ScrollAxis.vertical,
  props: { translateX: [0, 0], translateY: [0, 0] },
};

describe('Expect the Element class', () => {
  it('to construct', () => {
    const element = new Element(DEFAULT_OPTIONS);
    expect(element).toMatchObject(DEFAULT_OPTIONS);
  });

  it('to update props and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const updates = {
      disabled: true,
      translateX: [100, 100],
      translateY: [0, 0],
    };
    const instance = element.updateProps(updates);
    expect(instance.props).toMatchObject(updates);
    expect(instance).toBeInstanceOf(Element);
  });

  it('to set the correct updatePosition method', () => {
    const verticalElement = new Element(DEFAULT_OPTIONS);
    expect(verticalElement.updatePosition).toEqual(
      verticalElement._updatePositionVertical
    );
    const horizontalElement = new Element({
      ...DEFAULT_OPTIONS,
      scrollAxis: ScrollAxis.horizontal,
    });
    expect(horizontalElement.updatePosition).toEqual(
      horizontalElement._updatePositionHorizontal
    );
  });

  it('to set cache and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const view = new View({
      width: 100,
      height: 50,
      scrollContainer: createElementMock(),
    });
    const scroll = new Scroll(0, 40);
    const instance = element.setCachedAttributes(view, scroll);
    expect(instance).toBeInstanceOf(Element);
  });

  it('to update position and return the instance', () => {
    const element = new Element(DEFAULT_OPTIONS);
    const view = new View({
      width: 100,
      height: 50,
      scrollContainer: createElementMock(),
    });
    const scroll = new Scroll(0, 0);
    element.setCachedAttributes(view, scroll);
    scroll.setScroll(0, 100);

    const instance = element.updatePosition(view, scroll);
    expect(instance).toBeInstanceOf(Element);
  });
});
