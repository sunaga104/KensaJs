import {
  allResultMsg,
  callTitle,
  failLogo,
  passLogo,
  resultMsg,
  splitLine,
} from './message';
import testMain from './test';

interface KensaInstance {
  /**
   * Adds a new test to the Kensa suite.
   *
   * @param {Object} params - The parameters for the test.
   * @param {string} params.title - The title of the test.
   * @param {any} params.input - The test function or value to be tested.
   * @param {any} params.expect - The expected result of the test.
   */
  test: (params: { title: string; input: any; expect: any }) => void;
  /**
   * Runs all tests in the Kensa suite or specified runners if provided.
   *
   * @param {Function[]} [runners] - Optional. An array of runner functions to execute instead of the internal test suite.
   * @returns {Promise<void>} A promise that resolves once all tests have been executed.
   */
  run: (runners?: Function[]) => Promise<boolean>;
  /**
   * Returns a runner function that, when called, runs all tests in the Kensa suite.
   *
   * @returns {Function} A function that runs the test suite when invoked.
   */
  getRunner: () => Function;
}

/**
 * Creates a new Kensa testing instance for managing and running tests.
 *
 * @param {string} kensaTitle - The title for the Kensa test suite.
 * @returns An object containing methods to add tests, run them, and get a runner function.
 */
export default function Kensa(kensaTitle: string): KensaInstance {
  let tests: Array<() => Promise<boolean>> = [];

  function test({
    title,
    input,
    expect,
  }: {
    title: string;
    input: any;
    expect: any;
  }) {
    const testPromise = testMain({ title, input, expect });
    tests.push(testPromise);
  }

  async function run(runners?: Function[]) {
    let testResult = true;
    if (runners) {
      testResult = await multiTestRun(runners);
      return testResult;
    } else {
      testResult = await singleTestRun(kensaTitle, tests);
      tests = [];
      return testResult;
    }
  }

  function getRunner(): Function {
    return async () => {
      return await run();
    };
  }

  return {
    test,
    run,
    getRunner,
  };
}

async function singleTestRun(
  kensaTitle: string,
  tests: Array<() => Promise<boolean>>
) {
  let testResult = true;
  callTitle(kensaTitle);
  let successCount = 0;
  let failureCount = 0;
  const totalCount = tests.length;
  for (const test of tests) {
    const result = await test();
    if (result) {
      successCount++;
    } else {
      failureCount++;
    }
  }
  if (failureCount === 0) {
    passLogo();
  } else {
    failLogo();
    testResult = false;
  }
  resultMsg(totalCount, successCount, failureCount);
  return testResult;
}

async function multiTestRun(runners: Function[]) {
  let testResult = true;
  let successCount = 0;
  let failureCount = 0;
  const totalCount = runners.length;
  for (const runner of runners) {
    const result = await runner();
    if (result) {
      successCount++;
    } else {
      failureCount++;
    }
    splitLine();
  }
  allResultMsg(totalCount, successCount, failureCount);
  if (failureCount > 0) {
    testResult = false;
  }
  return testResult;
}
