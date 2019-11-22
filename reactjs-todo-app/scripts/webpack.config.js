const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      context: path.resolve(__dirname, '../src/packages/context'),
      layouts: path.resolve(__dirname, '../src/packages/layouts'),
      services: path.resolve(__dirname, '../src/packages/services'),
      ui: path.resolve(__dirname, '../src/packages/ui')
    }
  }
}
