import expect, { createSpy } from 'expect';
import { memoize } from '../src/utils';

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
