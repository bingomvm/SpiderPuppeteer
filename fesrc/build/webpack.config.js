const chalk = require('chalk');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const env = process.env.NODE_ENV;
const config = require('./config')(env);
const webpack = require('webpack');

const path = require('path');
const resolve = dir => path.join(__dirname, '..', dir);

const styleLoaders = require('./style')(env);

const vendors = ['vue', 'axios', 'element-ui', 'vuex', 'vue-router'];

const replacer = /[\\/]node_modules[\\/]|[\\/]/g;

console.log(chalk.red(`Current mode => ${env}`));

module.exports = {
  mode: env,
  entry: {
    app: path.resolve(__dirname, '../app.js'),
  },
  output: {
    path: config.assetsRoot,
    filename: '[name].js',
    publicPath: config.urlPrefix,
  },
  resolve: {
    mainFiles: ['index'],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@api': resolve('src/api'),
    },
  },
  devtool: {
    development: 'cheap-module-eval-source-map',
    production: '',
  }[env],
  module: {
    rules: [
      // vue loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: styleLoaders.forVue,
          cssSourceMap: false,
          cacheBusting: env === 'development',
          transformToRequire: {
            video: ['src', 'poster'],
            source: ['src'],
            img: ['src'],
            image: ['xlink:href'],
          },
        },
      },
      // style loaders
      ...styleLoaders.forWebpack,
      // js loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client'),
        ],
      },
      // pics
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(
            config.staticPath,
            'img/[name].[hash:7].[ext]'
          ),
        },
      },
      // media files
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(
            config.staticPath,
            'media/[name].[hash:7].[ext]'
          ),
        },
      },
      // fonts
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join(
            config.staticPath,
            'font/[name].[hash:7].[ext]'
          ),
        },
      },
    ],
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.IgnorePlugin(/codemirror/),
    new vueLoaderPlugin(),
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
    minimize: false,
    // runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: {
        vendor_vue: {
          chunks: 'initial',
          test: chunk => {
            return /[\\/]node_modules[\\/]/.test(chunk.resource);
          },
          name: 'libs',
          filename: path.posix.join(config.staticPath, '[name].js'),
          enforce: true,
          reuseExistingChunk: true,
        }
      },
    },
  },
};
