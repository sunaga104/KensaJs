import { TestSuite } from '../core/type';
import {
  allKsTestResultMsg,
  callSubTitle,
  callTitle,
  failLogo,
  passLogo,
  resultMsg,
  space,
} from '../infrastructure/log/message';
import sinon from 'sinon';

interface Index {
  paragraph: number;
  count: number;
}

let queue = Promise.resolve();

let totalSuiteCount = 0;
let completedSuiteCount = 0;

let allSuccessCount = 0;
let allFailureCount = 0;

export function runTestsSuite(testSuite: TestSuite) {
  totalSuiteCount++;
  queue = queue.then(async () => {
    let testResult = true;
    let successCount = 0;
    let failureCount = 0;
    let totalCount = 0;

    space();
    space();
    callTitle(testSuite.title);
    let currentParagraph = 0;
    let paragraphIndexes: Index[] = [];

    const updateParagraphIndex = (testParagraph: number): Index => {
      let paragraphIndex = paragraphIndexes.find(
        (i) => i.paragraph === testParagraph
      );
      if (!paragraphIndex) {
        paragraphIndex = { paragraph: testParagraph, count: 0 };
        paragraphIndexes.push(paragraphIndex);
      }
      paragraphIndex.count++;
      return paragraphIndex;
    };

    for (const test of testSuite.tests) {
      if (test.stub) {
        const { obj, method, returnValue } = test.stub;
        const targetFn = typeof method === 'string' ? obj[method] : method;
        const isAsync =
          targetFn && targetFn.constructor && targetFn.constructor.name === 'AsyncFunction';
        if (returnValue instanceof Error) {
          sinon.replace(obj, method, sinon.fake.throws(returnValue) as any);
        } else if (isAsync) {
          sinon.replace(obj, method, sinon.fake.resolves(returnValue) as any);
        } else {
          sinon.replace(obj, method, sinon.fake.returns(returnValue) as any);
        }
        continue;
      }
      if (test.clearStub) {
        sinon.restore();
        continue;
      }
      if (typeof test === 'function') {
        totalCount++;
        const result = await test(currentParagraph);
        result ? successCount++ : failureCount++;
      } else {
        currentParagraph = test.paragraph;
        const paragraphIndex = updateParagraphIndex(currentParagraph);
        callSubTitle(test.title, test.paragraph, paragraphIndex.count);
      }
    }

    // output test result
    testResult = failureCount === 0;
    testResult ? passLogo() : failLogo();
    resultMsg(totalCount, successCount, failureCount);
    testResult ? allSuccessCount++ : allFailureCount++;

    completedSuiteCount++;
    // output all test result
    if (completedSuiteCount === totalSuiteCount) {
      space();
      allKsTestResultMsg(totalSuiteCount, allSuccessCount, allFailureCount);
      space();
    }
  });
}

// runTestsSuiteのグローバルカウンタをリセットするための関数を追加
export function resetRunTestsSuiteCounters() {
  totalSuiteCount = 0;
  completedSuiteCount = 0;
  allSuccessCount = 0;
  allFailureCount = 0;
}
