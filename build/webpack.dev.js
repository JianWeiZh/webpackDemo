const path = require("path")
const webpack = require("webpack")
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    host: "localhost",
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
        test: /\.css/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'my-custom-hash',
              },
              sourceMap: true
            }
          },
          {loader: "postcss-loader"}
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },{
            loader: "css-loader",
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'my-custom-hash',
              },
              sourceMap: true
            }
          },{
            loader: "postcss-loader"
          },{
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
    filename: "[name].[hash].js"
  }
})
