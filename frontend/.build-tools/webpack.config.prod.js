const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const strip = require('strip-loader');

const webpack = require('webpack');

const IsoToolsPlugin = require('webpack-isomorphic-tools/plugin');
const isoToolsConfig = require('./webpack-isomorphic-tools.js');
const isoToolsPlugin = new IsoToolsPlugin(isoToolsConfig);

const config = require('../config');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client/entry',
  ],
  context: config.rootDir,
  output: {
    path: config.assetsPath,
    filename: '[name]-[hash].bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new CleanPlugin([config.assetsPath], { root: config.rootDir }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_ENDPOINT: JSON.stringify(config.apiEndpoint),
      },
    }),
    isoToolsPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  resolve: {
    extends: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [strip.loader('debug', 'console.log'), 'babel'],
      exclude: /node_modules/,
    },
    { test: /\.json$/, loader: 'json-loader' },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true') //eslint-disable-line
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') //eslint-disable-line
    }],
  },
};
