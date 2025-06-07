import { findTestFiles } from './infrastructure/file/findTestFiles';
import { displayStartMsg } from './infrastructure/log/message';
import { tsNodeCheck } from './infrastructure/utils/libraryCheck';

jest.mock('./infrastructure/file/findTestFiles');
jest.mock('./infrastructure/log/message', () => ({ displayStartMsg: jest.fn() }));
jest.mock('./infrastructure/utils/libraryCheck');

describe('runTests script', () => {
  const origArgv = process.argv;
  afterEach(() => {
    process.argv = origArgv;
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('loads test files when ts-node available', () => {
    (tsNodeCheck as jest.Mock).mockReturnValue(true);
    const file = '/tmp/test.ks.ts';
    (findTestFiles as jest.Mock).mockReturnValue([file]);
    (global as any).__loaded = false;
    jest.mock(file, () => { (global as any).__loaded = true; }, { virtual: true });
    process.argv = ['node', 'runTests.ts', '/tmp'];
    jest.isolateModules(() => {
      require('./runTests');
    });
    expect(findTestFiles).toHaveBeenCalledWith('/tmp', /\.ks\.(ts|js)$/);
    expect((global as any).__loaded).toBe(true);
    expect(displayStartMsg).toHaveBeenCalled();
  });

  test('uses js pattern when ts-node unavailable', () => {
    (tsNodeCheck as jest.Mock).mockReturnValue(false);
    (findTestFiles as jest.Mock).mockReturnValue([]);
    process.argv = ['node', 'runTests.ts', '/path'];
    jest.isolateModules(() => {
      require('./runTests');
    });
    expect(findTestFiles).toHaveBeenCalledWith('/path', /\.ks\.js$/);
  });
});
