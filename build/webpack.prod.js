const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'false', // 生产环境关闭sourceMap，减小包的体积
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
      ignoreOrder: false // 启用以删除有关顺序冲突的警告
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        exclude: /\/node_modules/,
        uglifyOptions: {
          output:{ // 删除注释
            comments: false
          },
          compress: { // 删除console、debugger、警告
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          },
          warnings: false
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: { // 代码分割
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              esModule: true,
            }
          },{
            loader: "css-loader",
            options: {
              modules:  {
                mode: 'local',
                localIdentName: '[path][name][hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'my-custom-hash',
              },
              sourceMap: false
            }
          },
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
