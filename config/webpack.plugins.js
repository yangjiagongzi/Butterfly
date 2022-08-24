const setting = require('./setting')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const cssPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name].[contenthash].css'
})

const tsCheckerPlugin = new ForkTsCheckerWebpackPlugin({
  typescript: {
    diagnosticOptions: {
      semantic: true,
      syntactic: true
    }
  }
})

const eslintPlugin = new ESLintPlugin({
  threads: true,
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  files: setting.appPath,
  fix: true
})

module.exports = {
  main: {
    dev: [tsCheckerPlugin, eslintPlugin],
    prod: []
  },
  renderer: {
    dev: [cssPlugin, tsCheckerPlugin, eslintPlugin],
    prod: [cssPlugin]
  }
}
