const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]__[local]--[hash:base64:5]"
              },
            }
          },
          "postcss-loader"
        ],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.EnvironmentPlugin([
      'COGNITO_CLIENT_ID',
      'COGNITO_DOMAIN',
      'COGNITO_REDIRECT_URI'
    ])
  ],
  resolve: {
    alias: {
      "@auth$": path.resolve(__dirname, "./src/modules/auth/index.ts"),
      "@shared$": path.resolve(__dirname, "./src/shared/index.ts"),
      "@shared/lib$": path.resolve(__dirname, "./src/shared/lib/index.ts"),
      "@home$": path.resolve(__dirname, "./src/modules/home/index.ts"),
      "@chess$": path.resolve(__dirname, "./src/modules/chess/index.ts")
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFiles: ['index']
  }
};