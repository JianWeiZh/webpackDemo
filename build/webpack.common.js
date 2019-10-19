const webpack = require('webpack')
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const apiConfig = require('./api')

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpackDemo",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({ // 环境变量配置 调用方法：API_CONFIG.变量
      API_CONFIG: JSON.stringify(apiConfig)
    })
  ],
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime'],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  performance: {
    hints: "warning"
  }
}
