const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.common')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const prodConfig = {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()],
  devtool: false,
  performance: {
    hints: false, // 禁用资源大小和加载性能提示信息
  },
  module: {
    // 独完整的 `react.production.min.js` 文件就没有采用模块化，忽略对 `react.production.min.js` 文件的递归解析处理
    noParse: /react\.production\.min\.js$/,
  },
  resolve: {
    alias: {
      // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.production.min.js 文件，
      // 减少耗时的递归解析操作
      react: path.resolve(__dirname, '../node_modules/react/umd/react.production.min.js'),
    },
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      minSize: {
        javascript: 30000,
        style: 50000,
      },
    },
  },
}

module.exports = merge(prodConfig, baseConfig)
