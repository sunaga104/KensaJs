import {
  allResultMsg,
  callTitle,
  failLogo,
  passLogo,
  resultMsg,
  splitLine,
} from './message';
import testMain from './test';
import { KensaInstance, KensaStub } from './type';

/**
 * Creates a new Kensa testing instance for managing and running tests.
 *
 * @param {string} kensaTitle - The title for the Kensa test suite.
 * @returns {KensaInstance} test object
 */
export default function Kensa(kensaTitle: string): KensaInstance {
  // testMain object list
  let tests: Array<() => Promise<boolean>> = [];

  function test<T, K extends keyof T>({
    title,
    input,
    expect,
    stub,
  }: {
    title: string;
    input: any;
    expect: any;
    stub?: KensaStub<T, K>;
  }) {
    if (stub && !(input instanceof Function)) {
      const errorMsg =
        'Stub tests are only available for functions. If you want to use a stub for a simple value test, you should replace simpleValue with () => simpleValue.';
      throw new Error(errorMsg);
    }
    const testPromise = testMain({ title, input, expect, stub });
    tests.push(testPromise);
  }

  function stub<T, K extends keyof T>(obj: T, method: K, returnValue: any) {
    if (!obj || !method) {
      throw new Error('Invalid arguments for stub function');
    }
    if (typeof obj[method] !== 'function') {
      throw new Error(
        `'${String(method)}' is not a function on the provided object`
      );
    }
    return {
      obj,
      method,
      returnValue,
    };
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
    stub,
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
