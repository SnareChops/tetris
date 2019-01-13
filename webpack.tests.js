const path = require('path');

module.exports = {
  mode: 'development',

  entry: './dist/test/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tests.js'
  }
};
