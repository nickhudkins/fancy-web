'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _schema = require('../graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _expressGraphql2.default)({
  schema: _schema2.default,
  graphiql: process.env.NODE_ENV !== 'production',
  pretty: process.env.NODE_ENV !== 'production',

  formatError: function formatError(error) {
    _logger2.default.error(error);
    return { message: 'Internal server error.' };
  }
});