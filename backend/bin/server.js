'use strict'; //eslint-disable-line

if (process.env.NODE_ENV !== 'production') {
  const fs = require('fs');

  //  enable runtime transpilation to use ES6/7 in node
  const babelrc = fs.readFileSync('./.babelrc');
  let config;

  try {
    config = JSON.parse(babelrc);
  } catch (err) {
    console.error('==> ERROR: Error parsing your .babelrc.'); //eslint-disable-line
    console.error(err); //eslint-disable-line
  }

  require('babel-register')(config);
  require('../src');
} else {
  require('../dist');
}
