const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  
  return {
    entry: ['@babel/polyfill', './src/index'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]'
              }
            },
          ],
        },
      ]
    },
    devServer: {
      historyApiFallback: true,
      contentBase: "/dist",
      proxy: {
        '/api': 'http://localhost:3001'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new FaviconsWebpackPlugin('./src/favicons/favicon.png'),
      new webpack.DefinePlugin(envKeys),
      new BundleAnalyzerPlugin()
    ]
  }
};