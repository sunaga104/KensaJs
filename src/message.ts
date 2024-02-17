import { logStyle } from './style';

export function callTitle(msg: string): void {
  console.log('📄', logStyle(msg).bold().build());
}

export function msg(msg: string): void {
  console.log(logStyle(msg).bold().build());
}

export function passLogo(): void {
  logStyle(' PASS ').bgGreen().white().bold().log();
}

export function failLogo(): void {
  logStyle(' FAIL ').bgRed().white().bold().log();
}

export function failureLog(title: string, result: string, expected: string) {
  console.log(
    ' ',
    logStyle('✗').red().bold().build(),
    '',
    title,
    ` (result: ${logStyle(String(result)).red().build()}, expected: ${logStyle(
      String(expected)
    )
      .yellow()
      .build()})`
  );
}

export function successLog(title: string) {
  console.log(' ', logStyle('✓').green().bold().build(), '', title);
}

export function resultMsg(
  total: number,
  success: number,
  failur: number
): void {
  console.log(
    `TOTAL: ${total}, PASS: ${logStyle(String(success))
      .green()
      .build()}, FAIL: ${logStyle(String(failur)).red().build()}`
  );
}

export function allResultMsg(
  total: number,
  success: number,
  failur: number
): void {
  if (failur === 0) {
    logStyle(decoratLine()).green().log();
    passLogo();
  } else {
    logStyle(decoratLine()).red().log();
    failLogo();
  }
  console.log(
    `TOTAL TESTS: ${total}, PASS: ${logStyle(String(success))
      .green()
      .build()}, FAIL: ${logStyle(String(failur)).red().build()}`
  );
  if (failur === 0) {
    logStyle(decoratLine()).green().log();
  } else {
    logStyle(decoratLine()).red().log();
  }
}

export function allKsTestResultMsg(
  total: number,
  success: number,
  failur: number
): void {
  if (failur === 0) {
    logStyle(decoratLine2()).green().bold().log();
    passLogo();
  } else {
    logStyle(decoratLine2()).red().bold().log();
    failLogo();
  }
  console.log(`TOTAL FILES: ${total}`);
  console.log(`PASS: ${logStyle(String(success)).green().build()}`);
  console.log(`FAIL: ${logStyle(String(failur)).red().build()}`);
  if (failur === 0) {
    logStyle(decoratLine2()).green().bold().log();
  } else {
    logStyle(decoratLine2()).red().bold().log();
  }
}

export function splitLine(): void {
  console.log();
  console.log('------------------------------------------');
  console.log();
}

export function decoratLine() {
  return '*********************************************';
}

export function decoratLine2(): string {
  return '===============================================================';
}

export function decoratLine3() {
  return '----------------------------------------------';
}

export function space(): void {
  console.log();
}
