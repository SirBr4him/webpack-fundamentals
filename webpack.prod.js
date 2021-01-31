const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new webpack.EnvironmentPlugin({ NODE_ENV: 'production' })],
});

if (process.env.NODE_ENV === 'production') {
  console.log('Welcome to production');
}
