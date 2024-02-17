import { callTitle } from './message';
import testMain from './test';

/**
 * Creates a new Kensa testing instance for managing and running tests.
 *
 * @param {string} kensaTitle - The title for the Kensa test suite.
 * @returns An object containing methods to add tests, run them, and get a runner function.
 */
export default function Kensa(kensaTitle: string): {
  test: (params: { title: string; input: any; expect: any }) => void;
  run: (runners?: Function[]) => Promise<void>;
  getRunner: () => Function;
} {
  let tests: Array<() => Promise<void>> = [];

  /**
   * Adds a new test to the Kensa suite.
   *
   * @param {Object} params - The parameters for the test.
   * @param {string} params.title - The title of the test.
   * @param {any} params.input - The test function or value to be tested.
   * @param {any} params.expect - The expected result of the test.
   */
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

  /**
   * Runs all tests in the Kensa suite or specified runners if provided.
   *
   * @param {Function[]} [runners] - Optional. An array of runner functions to execute instead of the internal test suite.
   * @returns {Promise<void>} A promise that resolves once all tests have been executed.
   */
  async function run(runners?: Function[]) {
    if (runners) {
      let filstFlg = true;
      for (const runner of runners) {
        if (filstFlg) {
          filstFlg = false;
        } else {
          console.log();
          console.log('------------------------------------------');
        }
        await runner();
      }
    } else {
      callTitle(kensaTitle);
      for (const test of tests) {
        await test();
      }
      tests = [];
    }
  }

  /**
   * Returns a runner function that, when called, runs all tests in the Kensa suite.
   *
   * @returns {Function} A function that runs the test suite when invoked.
   */
  function getRunner(): Function {
    return async () => {
      await run();
    };
  }

  return {
    test,
    run,
    getRunner,
  };
}
