const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  mode: 'production',
  devtool: 'false', // 生产环境关闭sourceMap，减小包的体积
  plugins: [
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
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minSize: 30000, // 模块的最小体积
          minChunks: 1, // 模块的最小被引用次数
          // maxAsyncRequests: 5, // 按需加载的最大并行请求数
          // maxInitialRequests: 3, // 一个入口最大并行请求数
          // automaticNameDelimiter: '~', // 文件名的连接符
          // cacheGroups: { // 缓存组
          //   vendors: {
          //     test: /[\\/]node_modules[\\/]/,
          //     priority: -10
          //   },
          //   default: {
          //     minChunks: 2,
          //     priority: -20,
          //     reuseExistingChunk: true
          //   }
          // }
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  output: {
    filename: "[name].[contenthash].js"
  }
})
