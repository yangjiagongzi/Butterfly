const setting = require('./setting')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

module.exports = {
  devtool: setting.isDev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
    alias: {
      '~': `${setting.srcPath}`
    }
  },
  module: {
    rules: rules.renderer
  },
  plugins: setting.isDev ? plugins.renderer.dev : plugins.renderer.prod
}
