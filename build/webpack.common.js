const webpack = require('webpack')
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const apiConfig = require('./api')

module.exports = {
  entry: {
    main: "./src/main.jsx"
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './../src')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack-react-demo",
      filename: "index.html",
      template: path.resolve(__dirname, './../src/index.ejs'),
      minify: {
        //是否去除空格，默认false
        collapseWhitespace: true,
        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: true,

        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
        //是否移除注释 默认false
        removeComments: true,
      }
    }),
    new webpack.DefinePlugin({ // 环境变量配置 调用方法：API_CONFIG.变量
      REACT_APP: JSON.stringify(apiConfig)
    })
  ],
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
        test: /\.jsx?$/,
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
