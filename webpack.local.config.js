const { merge } = require('webpack-merge');
const common = require('./webpack.base.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devConfig = merge(common, {
  mode: 'development',
  cache: false,
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: './public',
    watchFiles: ['src/**/*']
  },
  optimization: {
    moduleIds: "named"
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' })
  ]
});

module.exports = devConfig;