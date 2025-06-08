import { logStyle } from './style';

describe('logStyle', () => {
  test('applies color and style codes', () => {
    const styled = logStyle('hi').bold().green().build();
    expect(styled).toBe('\x1b[32m\x1b[1mhi\x1b[22m\x1b[39m');
  });

  test('log outputs to console', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logStyle('x').log();
    expect(spy).toHaveBeenCalledWith('x');
    spy.mockRestore();
  });
});
