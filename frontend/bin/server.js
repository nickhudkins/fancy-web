'use strict'; //eslint-disable-line
const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

const __DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

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

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const isoToolConfig = require('../.build-tools/webpack-isomorphic-tools');
const IsoTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new IsoTools(isoToolConfig)
  .development(__DEVELOPMENT__)
  .server(rootDir, () => {
    require('../src/server');
  });
