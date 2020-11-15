const webpack = require('webpack');
const slsw = require('serverless-webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  devtool: 'source-map',
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [new webpack.IgnorePlugin(/^pg-native$/)],
};
