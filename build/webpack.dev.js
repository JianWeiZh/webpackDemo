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
    proxy: {}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },{
            loader: "css-loader"
          },{
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: "[name].[hash].js"
  }
})