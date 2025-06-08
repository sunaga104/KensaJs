import Module from 'module';

describe('tsNodeCheck', () => {
  const originalResolveFilename = (Module as any)._resolveFilename;
  afterEach(() => {
    (Module as any)._resolveFilename = originalResolveFilename;
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('returns true when ts-node present', () => {
    const register = jest.fn();
    jest.doMock('ts-node', () => ({ register }), { virtual: true });
    (Module as any)._resolveFilename = jest.fn(() => 'ts-node.js');
    const { tsNodeCheck } = require('./libraryCheck');
    expect(tsNodeCheck()).toBe(true);
    expect(register).toHaveBeenCalled();
  });

  test('returns false and logs message when ts-node missing', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    (Module as any)._resolveFilename = jest.fn(() => {
      throw new Error('not found');
    });
    const { tsNodeCheck } = require('./libraryCheck');
    expect(tsNodeCheck()).toBe(false);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
