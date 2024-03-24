import { KensaInstance, TestSuite, TestTool } from './core/type';
import { runTestsSuite } from './service/runTestsSuite';
import testMain from './service/testMain';

export default function Kensa(): KensaInstance {
  let testSuite: TestSuite = {
    title: '',
    tests: [] as Array<TestTool>,
  };
  const mainTitle = (title: string) => {
    testSuite.title = title;
  };
  const subTitle = (title: string, paragraph: number = 1) => {
    testSuite.tests.push({ title, paragraph });
  };
  const test = ({
    title,
    input,
    expect,
  }: {
    title: string;
    input: any;
    expect: any;
  }) => {
    const testPromise = testMain({ title, input, expect });
    testSuite.tests.push(testPromise);
  };

  const stub = (obj: any, method: any, returnValue: any) => {
    testSuite.tests.push({ stub: { obj, method, returnValue } });
  };

  const clearStub = () => {
    testSuite.tests.push({ clearStub: 'clearStub' });
  };

  const run = () => {
    runTestsSuite(testSuite);
    testSuite = {
      title: '',
      tests: [],
    };
  };
  return {
    mainTitle,
    subTitle,
    test,
    stub,
    clearStub,
    run,
  };
}
