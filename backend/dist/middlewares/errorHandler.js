'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function errorHandler(err, _ref, res, _ref2) {
  _objectDestructuringEmpty(_ref2);

  _objectDestructuringEmpty(_ref);

  _logger2.default.error(err);

  if (res.headersSent) {
    res.end();
  } else {
    res.send(500, 'Internal server error.');
  }
}