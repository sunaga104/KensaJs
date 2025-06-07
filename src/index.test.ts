import Kensa from './index';
import { runTestsSuite } from './service/runTestsSuite';

jest.mock('./service/runTestsSuite', () => ({ runTestsSuite: jest.fn() }));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Kensa', () => {
  test('builds a test suite and runs it', () => {
    const ks = Kensa();
    ks.mainTitle('Main');
    const obj = { foo: () => 1 };
    ks.subTitle('sub', 2);
    ks.test({ title: 't1', input: 1, expect: 1 });
    ks.stub(obj, 'foo', 2);
    ks.clearStub();
    ks.run();
    expect(runTestsSuite).toHaveBeenCalledTimes(1);
    const suite = (runTestsSuite as jest.Mock).mock.calls[0][0];
    expect(suite.title).toBe('Main');
    expect(suite.tests.length).toBe(4);
  });

  test('resets suite after run', () => {
    const ks = Kensa();
    ks.run();
    ks.run();
    expect((runTestsSuite as jest.Mock).mock.calls[1][0]).toEqual({
      title: '',
      tests: [],
    });
  });
});
