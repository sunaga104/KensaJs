import { tsNodeCheck } from './libraryCheck';

describe('tsNodeCheck', () => {
  const originalResolve = require.resolve;
  afterEach(() => {
    require.resolve = originalResolve;
    jest.resetModules();
  });

  test('returns true when ts-node present', () => {
    const register = jest.fn();
    jest.mock('ts-node', () => ({ register }), { virtual: true });
    require.resolve = jest.fn();
    expect(tsNodeCheck()).toBe(true);
    expect(register).toHaveBeenCalled();
  });

  test('returns false and logs message when ts-node missing', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    require.resolve = jest.fn(() => { throw new Error('not found'); });
    expect(tsNodeCheck()).toBe(false);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
