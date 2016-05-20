'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _winston2.default.Logger({
  exitOnError: false,
  transports: [new _winston2.default.transports.Console({
    handleExceptions: true,
    humanReadableUnhandledException: true
  })]
});