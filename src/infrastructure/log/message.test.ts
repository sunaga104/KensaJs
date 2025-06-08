import { callTitle, failureLog, successLog, allResultMsg } from './message';
import { logStyle } from './style';

jest.mock('./style');

describe('message logging', () => {
  let mockBuild: jest.Mock;
  let mockChain: any;
  beforeEach(() => {
    mockBuild = jest.fn().mockReturnValue('styled');
    mockChain = {
      bold: jest.fn().mockReturnThis(),
      green: jest.fn().mockReturnThis(),
      red: jest.fn().mockReturnThis(),
      yellow: jest.fn().mockReturnThis(),
      bgGreen: jest.fn().mockReturnThis(),
      bgRed: jest.fn().mockReturnThis(),
      white: jest.fn().mockReturnThis(),
      build: mockBuild,
      log: jest.fn(),
    };
    (logStyle as jest.Mock).mockReturnValue(mockChain);
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
    jest.clearAllMocks();
  });

  test('callTitle logs styled title', () => {
    callTitle('T');
    expect(logStyle).toHaveBeenCalledWith('T');
    expect(mockChain.bold).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('📄', 'styled');
  });

  test('failureLog logs failure message', () => {
    failureLog('f', 'r', 'e', 1);
    expect(console.log).toHaveBeenCalled();
  });

  test('successLog logs success message', () => {
    successLog('s', 2);
    expect(console.log).toHaveBeenCalled();
  });

  test('allResultMsg logs final result', () => {
    allResultMsg(1, 1, 0);
    expect(console.log).toHaveBeenCalled();
  });
});
