const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const env = process.env.NODE_ENV;
const base = require('./webpack.config');
const config = require('./config')(env);

const devConfig = merge(base, {
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false,
    compress: true,
    host: config.host,
    port: config.port,
    overlay: false,
    publicPath: config.urlPrefix,
    proxy: config.proxy,
    quiet: true,
    disableHostCheck: true,
    index: '',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../'),
        to: config.staticPath,
        ignore: ['.*'],
      },
    ]),
    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`服务启动成功，输入url后点击渲染产看效果`],
      },
    }),
  ],
});

module.exports = devConfig;
