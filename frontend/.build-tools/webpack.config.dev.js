const path = require('path');
const webpack = require('webpack');

const IsoToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isoToolsPlugin = new IsoToolsPlugin(require('./webpack-isomorphic-tools'));

const config = require('../config');
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  context: config.rootDir,
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
    './src/client/entry',
  ],
  output: {
    path: config.assetsPath,
    filename: 'bundle.js',
    publicPath: `http://${host}:${port}/dist/`,
  },
  resolve: {
    extensions: ['', '.json', '.js'],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=react-hmre',
      exclude: /node_modules/,
    },
    { test: /\.json$/, loader: 'json-loader' },
    {
      test: /\.scss$/,
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version' //eslint-disable-line
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.IgnorePlugin(/webpack-stats\.json/),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_ENDPOINT: JSON.stringify(config.apiEndpoint),
      },
    }),
    isoToolsPlugin.development(),
  ],
};
