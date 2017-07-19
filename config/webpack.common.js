const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename:'[id].build.js?[chunkhash]',
    //publicPath: './dist/', 该属性在prod里，会定义文件的路由，在开发模式没什么用，除非用cdn
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.elm', '.js', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'url-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          'elm-hot-loader',
          'elm-webpack-loader',
          ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "postcss-loader" //polyfills the css
        },{
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  plugins: [

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    new CleanWebpackPlugin(['./dist']),
    new HtmlWebpackPlugin({
      template: './src/static/index.html',
      chunksSortMode: 'dependency',
      inject: 'body',
      filename: 'index.html'
    })
  ]
}
