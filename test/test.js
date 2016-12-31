import expect, { createSpy } from 'expect';
import mapper from '../src/Mapper';
import { memoize } from '../src/utils';

describe('react map', () => {
  it('should list all components', () => {
    return mapper.getComponents('./fixtures').then(components => {
      expect(components.length).toBe(3);
      expect(components).toInclude({name: 'Button', path: './fixtures/Button.js'});
      expect(components).toInclude({name: 'Tabs', path: './fixtures/Tabs.js'});
      expect(components).toInclude({name: 'Tab', path: './fixtures/Tab.js'});
    })
  });

  it('should list all child components', () => {
    return mapper.getChildren('./fixtures/Tabs.js').then(children => {
      expect(children.length).toBe(2);
      expect(children).toInclude({name: 'div'});
      expect(children).toInclude({name: 'Tab'});
    });
  });

  it('should list all class names', () => {
    return mapper.getClassNames('./fixtures/Tabs.js').then(classNames => {
      expect(classNames.length).toBe(3);
      expect(classNames).toInclude({name: 'tabs'});
      expect(classNames).toInclude({name: 'header'});
      expect(classNames).toInclude({name: 'header--large'});
    });
  });

  it('should list all dependencies', () => {
    return mapper.getDependencies('./fixtures/Tabs.js').then(dependencies => {
      expect(dependencies.length).toBe(2);
      expect(dependencies).toInclude({name: 'React', path: 'react'});
      expect(dependencies).toInclude({name: 'Tab', path: './Tab'});
    });
  });
});

describe('utils:memoize', () => {
  it('should return a new function that returns the same data', () => {
    const fn = createSpy().andReturn(100);
    const fnMemoized = memoize(fn);
    expect(fnMemoized()).toBe(100);
  });

  it('should only call the original function once', () => {
    const fn = createSpy().andReturn(100);
    const fnMemoized = memoize(fn);
    fnMemoized();
    fnMemoized();
    fnMemoized();
    expect(fn.calls.length).toBe(1);
  });

  it('should return the same value every time the function is called', () => {
    const fn = createSpy().andReturn(100);
    const fnMemoized = memoize(fn);
    expect(fnMemoized()).toBe(100);
    expect(fnMemoized()).toBe(100);
    expect(fnMemoized()).toBe(100);
  });

  it('should respect different arguments passed to the original function', () => {
    const fn = createSpy((a, b) => a + b).andCallThrough();
    const fnMemoized = memoize(fn);
    expect(fnMemoized(1, 2)).toBe(3);
    expect(fnMemoized(10, 2)).toBe(12);
    expect(fnMemoized(1, 2)).toBe(3);
    expect(fnMemoized(10, 2)).toBe(12);
    expect(fn.calls.length).toBe(2);
  });
});