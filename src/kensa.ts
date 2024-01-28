export default function Kensa() {
  let errors: any[] = [];
  function title(msg: string) {
    console.log('📄', boid(msg));
  }
  function test(msg: string, func: any, expected: any) {
    errors = [];
    try {
      if (func !== expected) {
        console.log(
          boid(red('✗')),
          msg,
          ` (result: ${red(func)}, expected: ${yellow(expected)})`
        );
      } else {
        console.log(boid(green('✓')), msg);
      }
    } catch (e) {
      console.log(boid(red('✗')), msg);
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
