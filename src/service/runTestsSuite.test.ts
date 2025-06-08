import { TestSuite } from '../core/type';

jest.mock('../infrastructure/log/message', () => ({
  callTitle: jest.fn(),
  callSubTitle: jest.fn(),
  passLogo: jest.fn(),
  failLogo: jest.fn(),
  resultMsg: jest.fn(),
  space: jest.fn(),
  allKsTestResultMsg: jest.fn(),
}));

let runTestsSuite: (suite: TestSuite) => void;
let message: any;

beforeEach(() => {
  jest.resetModules();
  // Re-import after resetting modules to reset internal state
  message = require('../infrastructure/log/message');
  runTestsSuite = require('./runTestsSuite').runTestsSuite;
  jest.clearAllMocks();
});

describe('runTestsSuite', () => {
  test('logs success when all tests pass', async () => {
    const suite: TestSuite = {
      title: 'My Suite',
      tests: [
        { title: 'Sub', paragraph: 1 },
        async () => true,
      ],
    };

    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));

    expect(message.callTitle).toHaveBeenCalledWith('My Suite');
    expect(message.callSubTitle).toHaveBeenCalledWith('Sub', 1, 1);
    expect(message.passLogo).toHaveBeenCalled();
    expect(message.failLogo).not.toHaveBeenCalled();
    expect(message.resultMsg).toHaveBeenCalledWith(1, 1, 0);
    expect(message.allKsTestResultMsg).toHaveBeenCalledWith(1, 1, 0);
  });

  test('logs failure when a test fails', async () => {
    const suite: TestSuite = {
      title: 'Fail Suite',
      tests: [async () => false],
    };

    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));

    expect(message.failLogo).toHaveBeenCalled();
    expect(message.passLogo).not.toHaveBeenCalled();
    expect(message.resultMsg).toHaveBeenCalledWith(1, 0, 1);
    expect(message.allKsTestResultMsg).toHaveBeenCalledWith(1, 0, 1);
  });
});
