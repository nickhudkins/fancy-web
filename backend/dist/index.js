'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _graphql = require('./middlewares/graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use('/graphql', _graphql2.default);
app.use('/status', function (req, res) {
  return res.json({ status: 'ok' });
});
app.use(_errorHandler2.default);

var PORT = process.env.PORT || 3003;

var server = app.listen(PORT, function (err) {
  if (err) {
    _logger2.default.error(err);
  } else {
    var _server$address = server.address();

    var address = _server$address.address;
    var port = _server$address.port;

    _logger2.default.info('Backend is listening at http://' + address + ':' + port);

    if (process.send) {
      process.send('ready');
    }
  }
});