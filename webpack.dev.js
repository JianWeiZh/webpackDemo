const path = require("path")
const webpack = require("webpack")
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    host: "localhost",
    port: 8080,
    proxy: {}
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
