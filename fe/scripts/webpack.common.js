const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const aliasPath = require('../tsconfig.json').compilerOptions.paths

module.exports = {
  /**入口 */
  entry: {
    main: path.resolve(__dirname, '../src/home/index.tsx'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    /**解决刷新重定位失败 */
    publicPath: '/',
  },
  resolve: {
    /**设置别名,从tsconfig中读取paths */
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.tsx', '.ts', '.scss', '.js', '.jsx'],
    fallback: {},
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[hash][ext][query]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.pcd$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/pcd',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.mdx$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      inject: true,
    }),
  ],
  /**源码跳转 */
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
}
