import { deepEqual } from './deepEqual';
import { bold, green, red, yellow } from './style';

export default function test({
  title,
  input,
  expect,
}: {
  title: string;
  input: any;
  expect: any;
}) {
  return async () => {
    try {
      let result;
      if (input instanceof Function) {
        result = await input();
      } else {
        result = input;
      }
      if (expect instanceof Error) {
        console.log(
          bold(red('✗')),
          title,
          ` (expected error: ${yellow(expect.message)}, but got result: ${red(
            String(result)
          )})`
        );
      } else if (!deepEqual(result, expect)) {
        console.log(
          bold(red('✗')),
          title,
          ` (result: ${red(String(result))}, expected: ${yellow(
            String(expect)
          )})`
        );
      } else {
        console.log(bold(green('✓')), title);
      }
    } catch (e) {
      if (expect instanceof Error && e instanceof Error) {
        if (e.message === expect.message) {
          console.log(bold(green('✓')), title);
        } else {
          console.log(
            bold(red('✗')),
            title,
            ` (result error: ${red(e.message)}, expected error: ${yellow(
              expect.message
            )})`
          );
        }
      } else if (e instanceof Error) {
        console.log(bold(red('✗')), title, ` (error: ${red(e.message)})`);
      } else {
        console.log(bold(red('✗')), title, ` (error: ${red('Unknown error')})`);
      }
    }
  };
}
