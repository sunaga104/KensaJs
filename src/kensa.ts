/**
 * KensaJs main function
 * @example
 * const kensa = Kensa();
 * kensa.title('Sample test');
 * @returns
 */
export default function Kensa() {
  let errors: any[] = [];
  function title(msg: string) {
    console.log('📄', boid(msg));
  }
  function test({
    title,
    func,
    expect,
  }: {
    title: string;
    func: any;
    expect: any;
  }) {
    errors = [];
    try {
      if (func !== expect) {
        console.log(
          boid(red('✗')),
          title,
          ` (result: ${red(func)}, expected: ${yellow(expect)})`
        );
      } else {
        console.log(boid(green('✓')), title);
      }
    } catch (e) {
      console.log(boid(red('✗')), title);
      errors.push(e);
    }
  }

  return {
    title,
    test,
  };
}

function boid(msg: string) {
  return `\x1b[1m${msg}\x1b[22m`;
}

function green(msg: string) {
  return `\x1b[32m${msg}\x1b[39m`;
}

function red(msg: string) {
  return `\x1b[31m${msg}\x1b[39m`;
}

function yellow(msg: string) {
  return `\x1b[33m${msg}\x1b[39m`;
}
