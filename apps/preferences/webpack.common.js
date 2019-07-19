const integratePhoenix = require('../../webpack-phoenix-integration')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = integratePhoenix({
  plugins: [
    new VueLoaderPlugin()
  ],
  entry: {
    'preferences': [
      'core-js/modules/es6.promise',
      'core-js/modules/es6.array.iterator',
      './src/app.js'
    ]
  },
  output: {
    publicPath: 'apps/preferences/',
    chunkFilename: '[name].preferences.chunk.js',
    filename: 'preferences.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        rootMode: 'upward'
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }]
  }
})
