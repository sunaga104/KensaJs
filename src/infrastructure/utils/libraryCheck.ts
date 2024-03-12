export function tsNodeCheck() {
    let tsNodeAvailable = false;
    try {
      require.resolve('ts-node');
      tsNodeAvailable = true;
      require('ts-node').register();
      return tsNodeAvailable;
    } catch (error) {
      console.log(
        '`ts-node` is not installed. Proceeding with JavaScript files only.'
      );
      return tsNodeAvailable;
    }
  }