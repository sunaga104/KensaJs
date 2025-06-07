import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  test('returns true for equal primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);
  });

  test('returns false for unequal primitives', () => {
    expect(deepEqual(1, 2)).toBe(false);
  });

  test('returns true for deeply equal objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('returns false for objects with different values', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });
});
