const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const apiConfig = require('./api')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    main: './src/main.jsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    },
    extensions: ['.js', '.jsx', '.css', '.scss', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-react-demo',
      filename: 'index.html',
      template: path.resolve(__dirname, './../src/index.ejs'),
      minify: {
        //是否去除空格，默认false
        collapseWhitespace: true,
        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: devMode,

        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
        //是否移除注释 默认false
        removeComments: true,
      }
    }),
    new webpack.DefinePlugin({ // 环境变量配置 调用方法：API_CONFIG.变量
      REACT_APP: JSON.stringify(apiConfig)
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
      ignoreOrder: false // 启用以删除有关顺序冲突的警告
    })
  ],
  optimization: {
    usedExports: devMode,
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[hash:7].[name].[ext]',
            publicPath: '/dist/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[hash:7].[name].[ext]',
            publicPath: '/dist/'
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              esModule: true,
              hmr: devMode,
              reloadAll: devMode
            }
          },{
            loader: 'css-loader',
            options: {
              modules:  {
                mode: 'local',
                localIdentName: '[path][name][hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'my-custom-hash',
              },
              sourceMap: devMode
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
              sourceMap: devMode
            }
          }
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
    hints: 'warning'
  }
}
