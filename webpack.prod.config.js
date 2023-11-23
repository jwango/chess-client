const { merge } = require('webpack-merge');
const common = require('./webpack.base.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: undefined,
  optimization: {
    minimize: true
  },
  output: {
    filename: 'js/[name]-[contenthash:8].bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name]-[contenthash:8].css' })
  ]
});