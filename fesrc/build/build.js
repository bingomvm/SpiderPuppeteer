const postcssSafeParser = require('postcss-safe-parser');
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const env = process.env.NODE_ENV;
const config = require('./config')(env);
const base = require('./webpack.config');

const prodConfig = webpackMerge(base, {
  output: {
    path: config.assetsRoot,
    chunkFilename: path.posix.join(
      config.staticPath,
      '[name].js'
    ),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
    }),
    new uglifyjsWebpackPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: config.cssSourceMap,
      parallel: true,
    }),
    new optimizeCssAssetsWebpackPlugin({
      cssProcessorOptions: {
        map: { inline: false },
        removeComments: true,
        parser: postcssSafeParser,
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});

console.log(chalk.green('Building...'));

webpack(prodConfig, (err, stats) => {
  if (err) throw err;

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      modules: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n'
  );

  if (stats.hasErrors()) {
    console.log(chalk.red('Build failed'));
    process.exit(1);
  }

  console.log(chalk.green('Build finished'));
});
