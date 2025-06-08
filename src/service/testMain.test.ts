import testMain from './testMain';
import * as message from '../infrastructure/log/message';

jest.mock('../infrastructure/log/message', () => ({
  failureLog: jest.fn(),
  successLog: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('testMain', () => {
  test('returns true and logs success when value equals expect', async () => {
    const runner = testMain({ title: 'value', input: 1, expect: 1 });
    const result = await runner(0);
    expect(result).toBe(true);
    expect(message.successLog).toHaveBeenCalledWith('value', 0);
    expect(message.failureLog).not.toHaveBeenCalled();
  });

  test('handles async function input and logs success', async () => {
    const runner = testMain({
      title: 'func',
      input: async () => 5,
      expect: 5,
    });
    const result = await runner(1);
    expect(result).toBe(true);
    expect(message.successLog).toHaveBeenCalledWith('func', 1);
  });

  test('logs failure when result differs from expect', async () => {
    const runner = testMain({ title: 'diff', input: 1, expect: 2 });
    const result = await runner(2);
    expect(result).toBe(false);
    expect(message.failureLog).toHaveBeenCalledWith('diff', 1, 2, 2);
    expect(message.successLog).not.toHaveBeenCalled();
  });

  test('logs failure when expected error but no error thrown', async () => {
    const runner = testMain({
      title: 'no-throw',
      input: () => 1,
      expect: new Error('boom'),
    });
    const result = await runner(3);
    expect(result).toBe(false);
    expect(message.failureLog).toHaveBeenCalledWith('no-throw', 1, 'boom', 3);
  });

  test('logs success when expected error is thrown', async () => {
    const runner = testMain({
      title: 'throw',
      input: () => {
        throw new Error('err');
      },
      expect: new Error('err'),
    });
    const result = await runner(4);
    expect(result).toBe(true);
    expect(message.successLog).toHaveBeenCalledWith('throw', 4);
  });

  test('logs failure for unexpected error message', async () => {
    const runner = testMain({
      title: 'unexpected',
      input: () => {
        throw new Error('wrong');
      },
      expect: new Error('expected'),
    });
    const result = await runner(5);
    expect(result).toBe(false);
    expect(message.failureLog).toHaveBeenCalledWith('unexpected', 'wrong', 'expected', 5);
  });

  test('logs unknown error for non-Error throw', async () => {
    const runner = testMain({
      title: 'unknown',
      input: () => {
        throw 'oops';
      },
      expect: 1,
    });
    const result = await runner(6);
    expect(result).toBe(false);
    expect(message.failureLog).toHaveBeenCalledWith('unknown', 'Unknown error', 1, 6);
  });
});
