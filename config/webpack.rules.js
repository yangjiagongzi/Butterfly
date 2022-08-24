const setting = require('./setting')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const tsRule = {
  test: /\.ts(x?)$/,
  include: setting.srcPath,
  exclude: /node_modules/,
  use: [
    {
      loader: 'thread-loader',
      options: { workers: setting.cpuSize - 1, poolRespawn: false }
    },
    {
      loader: 'babel-loader'
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true,
        configFile: setting.tsconfigPath
      }
    }
  ]
}

const jsRule = {
  test: /\.js(x?)$/,
  include: setting.srcPath,
  exclude: /node_modules/,
  use: [
    {
      loader: 'thread-loader',
      options: { workers: setting.cpuSize - 1, poolRespawn: false }
    },
    {
      loader: 'babel-loader'
    }
  ]
}

module.exports = {
  main: [tsRule, jsRule],
  renderer: [
    tsRule,
    jsRule,
    {
      test: /\.css$/,
      include: setting.srcPath,
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      include: setting.srcPath + '/assets/svg',
      exclude: /node_modules/,
      use: [
        { loader: 'svg-sprite-loader', options: {} },
        {
          loader: 'svgo-loader',
          options: {
            plugins: [
              {
                name: 'removeAttrs',
                params: { attrs: 'stroke' }
              }
            ]
          }
        }
      ]
    }
  ]
}
