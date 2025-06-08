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
let resetRunTestsSuiteCounters: () => void;

beforeEach(() => {
  jest.resetModules();
  // Re-import after resetting modules to reset internal state
  message = require('../infrastructure/log/message');
  runTestsSuite = require('./runTestsSuite').runTestsSuite;
  resetRunTestsSuiteCounters = require('./runTestsSuite').resetRunTestsSuiteCounters;
  jest.clearAllMocks();
  resetRunTestsSuiteCounters();
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

  test('handles stub operations correctly', async () => {
    const mockObj = { testMethod: () => 'original' };
    const suite: TestSuite = {
      title: 'Stub Suite',
      tests: [
        { stub: { obj: mockObj, method: 'testMethod', returnValue: 'stubbed' } },
        async () => mockObj.testMethod() === 'stubbed',
        { clearStub: true },
        async () => mockObj.testMethod() === 'original',
      ],
    };

    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));

    expect(message.callTitle).toHaveBeenCalledWith('Stub Suite');
    expect(message.passLogo).toHaveBeenCalled();
    expect(message.resultMsg).toHaveBeenCalledWith(2, 2, 0);
  });

  test('handles async stub operations correctly', async () => {
    const mockObj = { asyncMethod: async () => 'original' };
    const suite: TestSuite = {
      title: 'Async Stub Suite',
      tests: [
        { stub: { obj: mockObj, method: 'asyncMethod', returnValue: 'async stubbed' } },
        async () => (await mockObj.asyncMethod()) === 'async stubbed',
        { clearStub: true },
      ],
    };

    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));

    expect(message.callTitle).toHaveBeenCalledWith('Async Stub Suite');
    expect(message.passLogo).toHaveBeenCalled();
    expect(message.resultMsg).toHaveBeenCalledWith(1, 1, 0);
  });

  test('handles error stub operations correctly', async () => {
    const mockObj = { errorMethod: () => 'original' };
    const testError = new Error('Test error');
    const suite: TestSuite = {
      title: 'Error Stub Suite',
      tests: [
        { stub: { obj: mockObj, method: 'errorMethod', returnValue: testError } },
        async () => {
          try {
            mockObj.errorMethod();
            return false; // Should not reach here
          } catch (error) {
            return error === testError;
          }
        },
        { clearStub: true },
      ],
    };

    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));

    expect(message.callTitle).toHaveBeenCalledWith('Error Stub Suite');
    expect(message.passLogo).toHaveBeenCalled();
    expect(message.resultMsg).toHaveBeenCalledWith(1, 1, 0);
  });

  test('handles multiple paragraphs and callSubTitle calls', async () => {
    const suite: TestSuite = {
      title: 'Multi Paragraph Suite',
      tests: [
        { title: 'Sub1', paragraph: 1 },
        async () => true,
        { title: 'Sub2', paragraph: 2 },
        async () => true,
        { title: 'Sub1 again', paragraph: 1 },
        async () => true,
      ],
    };
    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));
    expect(message.callSubTitle).toHaveBeenCalledWith('Sub1', 1, 1);
    expect(message.callSubTitle).toHaveBeenCalledWith('Sub2', 2, 1);
    expect(message.callSubTitle).toHaveBeenCalledWith('Sub1 again', 1, 2);
    expect(message.resultMsg).toHaveBeenCalledWith(3, 3, 0);
  });

  test('handles async stub that throws (rejects)', async () => {
    const mockObj = { asyncMethod: async () => 'original' };
    const testError = new Error('Async error');
    const suite: TestSuite = {
      title: 'Async Throw Stub Suite',
      tests: [
        { stub: { obj: mockObj, method: 'asyncMethod', returnValue: testError } },
        async () => {
          try {
            await mockObj.asyncMethod();
            return false;
          } catch (e) {
            return e === testError;
          }
        },
        { clearStub: true },
      ],
    };
    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));
    expect(message.callTitle).toHaveBeenCalledWith('Async Throw Stub Suite');
    expect(message.passLogo).toHaveBeenCalled();
    expect(message.resultMsg).toHaveBeenCalledWith(1, 1, 0);
  });

  test('clearStub restores all stubs (side effect test)', async () => {
    const obj1 = { foo: () => 'a' };
    const obj2 = { bar: () => 'b' };
    const suite: TestSuite = {
      title: 'ClearStub Side Effect Suite',
      tests: [
        { stub: { obj: obj1, method: 'foo', returnValue: 'x' } },
        { stub: { obj: obj2, method: 'bar', returnValue: 'y' } },
        async () => obj1.foo() === 'x' && obj2.bar() === 'y',
        { clearStub: true },
        async () => obj1.foo() === 'a' && obj2.bar() === 'b',
      ],
    };
    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));
    expect(message.callTitle).toHaveBeenCalledWith('ClearStub Side Effect Suite');
    expect(message.passLogo).toHaveBeenCalled();
    expect(message.resultMsg).toHaveBeenCalledWith(2, 2, 0);
  });

  test('allKsTestResultMsg is only called after all suites', async () => {
    const suite1: TestSuite = {
      title: 'Suite1',
      tests: [async () => true],
    };
    const suite2: TestSuite = {
      title: 'Suite2',
      tests: [async () => false],
    };
    runTestsSuite(suite1);
    runTestsSuite(suite2);
    await new Promise((r) => setTimeout(r, 0));
    // 1回呼ばれる（suite1, suite2の合計が終わった時のみ）
    expect(message.allKsTestResultMsg).toHaveBeenCalledTimes(1);
    expect(message.allKsTestResultMsg).toHaveBeenCalledWith(2, 1, 1);
  });

  test('passLogo and failLogo are mutually exclusive', async () => {
    const suitePass: TestSuite = {
      title: 'Pass Suite',
      tests: [async () => true],
    };
    const suiteFail: TestSuite = {
      title: 'Fail Suite',
      tests: [async () => false],
    };
    runTestsSuite(suitePass);
    runTestsSuite(suiteFail);
    await new Promise((r) => setTimeout(r, 0));
    // passLogoは1回、failLogoは1回のみ呼ばれる
    expect(message.passLogo).toHaveBeenCalledTimes(1);
    expect(message.failLogo).toHaveBeenCalledTimes(1);
  });

  test('space is called at least twice per suite', async () => {
    const suite: TestSuite = {
      title: 'Space Suite',
      tests: [async () => true],
    };
    runTestsSuite(suite);
    await new Promise((r) => setTimeout(r, 0));
    expect(message.space.mock.calls.length).toBeGreaterThanOrEqual(2);
  });
});
