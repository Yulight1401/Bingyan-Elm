const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path')
const publicPath = path.join(__dirname, '../dist')

module.exports = Merge(CommonConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:7777',
    path.join(__dirname, '../src/static/index.js')
  ],
  devtool: '#eval-source-map',

  plugins: [
      new webpack.HotModuleReplacementPlugin(), // Enable HMR
      new webpack.optimize.OccurrenceOrderPlugin()
  ],

  devServer: {
    port: 7777,
    hot: true,
    host: 'localhost',
    contentBase: './src',
    //publicPath: '/dist/',   //设置这个属性，访问localhost:7777/dist/index.html才能看到
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal'
  }
})
