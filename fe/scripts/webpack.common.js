const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const aliasPath = require('../tsconfig.json').compilerOptions.paths
const WebpackBar = require('webpackbar')

const cfg = {
  /**入口 */
  entry: {
    main: path.resolve(__dirname, '../src/main.tsx'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../fe/dist'),
    /**解决刷新重定位失败 */
    publicPath: '/',
  },
  resolve: {
    /**设置别名,从tsconfig中读取paths */
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.js', '.tsx', '.ts', 'scss'],
    fallback: {},
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(t|j)sx?$/,
            exclude: /node_modules/,
            include: [path.resolve(__dirname, '../src')],
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
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'resolve-url-loader',
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
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: '@mdx-js/loader',
              },
            ],
          },
        ],
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
    new WebpackBar(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  // cache: {
  //   type: 'filesystem', // 缓存类型，默认为 memory
  //   version: '1.0', // 缓存版本号，默认为空字符串
  //   buildDependencies: {
  //     config: [__filename], // 依赖项
  //   },
  // },
}
module.exports = cfg
