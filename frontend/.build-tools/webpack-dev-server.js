const Express = require('express');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config.dev');
const compiler = webpack(webpackConfig);

const config = require('../config');
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, (err) => {
  if (err) {
    console.error(err); //eslint-disable-line
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port); //eslint-disable-line
  }
});
