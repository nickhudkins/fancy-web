const webpack = require('webpack');

const config = require('../config');
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const vendorList = [
  'react',
  'react-dom',
  'bluebird',
  'lodash',
  'react-router',
  'react-router-relay',
  'isomorphic-relay',
  'isomorphic-relay-router',
];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: config.rootDir,
  entry: {
    app: [
      'eventsource-polyfill',
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      './src/client/entry',
    ],
    vendor: vendorList,
  },
  output: {
    path: config.assetsPath,
    filename: '[name].bundle.js',
    publicPath: `http://${host}:${port}/static/`,
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.json', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    { test: /\.json$/, loader: 'json-loader' },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version' //eslint-disable-line
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: 2,
    }),
    new webpack.IgnorePlugin(/webpack-stats\.json/),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
