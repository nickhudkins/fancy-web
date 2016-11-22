const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const strip = require('strip-loader');

const webpack = require('webpack');

const config = require('../config');

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
  devtool: 'source-map',
  entry: {
    app: [
      './src/client/entry',
    ],
    vendor: vendorList,
  },
  context: config.rootDir,
  output: {
    path: config.assetsPath,
    filename: '[name].bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new CleanPlugin([config.assetsPath], { root: config.rootDir }),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: 2,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_VERSION: JSON.stringify(config.appVersion),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [strip.loader('debug'), 'babel-loader'],
      exclude: /node_modules/,
    },
    { test: /\.json$/, loader: 'json-loader' }
  ],
  },
};
