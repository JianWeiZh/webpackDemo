const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    host: 'localhost',
    port: 8080,
    proxy: {},
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, './')],
        loader: 'eslint-loader',
        options: {
          emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
          emitError: true, // 这个配置需要打开，才能在控制台输出error信息
          fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
        }
      }
    ]
  },
  output: {
    filename: '[name].[hash].js'
  }
})
