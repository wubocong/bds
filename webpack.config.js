const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './app/entry.js'],
  output: {
    path: __dirname + '/build/',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss?$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.png?$/,
        loader: 'url'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    publicPath: '/build/',
    hot: true,
    'history-api-fallback': true,
    inline: true
  }
};