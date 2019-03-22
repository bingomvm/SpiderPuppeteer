const path = require('path');
const argv = require('yargs').argv;

const config = {
  base: {
    assetsRoot: path.resolve(__dirname, '../../www/static/js'),
    cssSourceMap: false,
    staticPath: '',
    port: 3100,
    host: 'localhost',
  },
  development: {
    urlPrefix: '/static/js/',
    proxy: {
      '*': {
        target: `http://127.0.0.1:8360`,
        changeOrigin: true,
      },
    },
  },
  production: {
    urlPrefix: '/static/js/',
    index: path.resolve(__dirname, '../../static/html/v2index.html'),
  },
};

module.exports = env => Object.assign({}, config.base, config[env]);
