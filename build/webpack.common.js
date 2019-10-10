const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

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
    new ExtractTextPlugin("styles.css")
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
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
      }
    ]
  },
  performance: false
}
