const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'false', // 生产环境关闭sourceMap，减小包的体积
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    splitChunks: { // 代码分割
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        styles: {
          name: 'css/main',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("dart-sass")
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "js/[name].[contenthash].js"
  }
})
