const ExtractTextPlugin = require('extract-text-webpack-plugin');

const miniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoader = env => {
  return {
    loader: 'css-loader',
    options: {
      sourceMap: env,
    },
  };
};

const postCssLoader = env => {
  return {
    loader: 'postcss-loader',
    options: {
      sourceMap: env,
    },
  };
};

const sassLoader = env => {
  return {
    loader: 'sass-loader',
    options: {
      sourceMap: env,
    },
  };
};

const withExtractTextPlugin = loaders => {
  return [miniCssExtractPlugin.loader].concat(loaders);
};

const writeConfig = loaders => {
  return Object.keys(loaders).map(ext => {
    return {
      test: new RegExp('\\.' + ext + '$'),
      use: loaders[ext],
    };
  });
};

module.exports = env => {
  const dev = env === 'development';
  const loaders = [];

  loaders.push('vue-style-loader');
  // if (prod) loaders.push(miniCssExtractPlugin.loader);

  loaders.push(cssLoader(dev));
  loaders.push(postCssLoader(dev));

  const sassLoaders = [...loaders, sassLoader(dev)];

  const styleLoaders = {
    css: loaders,
    scss: sassLoaders,
  };

  return {
    forVue: styleLoaders,
    forWebpack: writeConfig(styleLoaders),
  };
};
