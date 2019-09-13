import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'

const config: Configuration = {
  entry: './src/client/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, 'src/client-build'),
    filename: 'bundle.min.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    })
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false
      }
    },
    port: 3000
  }
}

export default config
