const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');

const devMode = process.env.npm_lifecycle_script.indexOf('development') !== -1;

module.exports = {
  devServer: {
    contentBase: '/',
    historyApiFallback: true,
    inline: true,
    port: 2222,
  },
  entry: [
    './src/index.js',
    './src/scss/app.scss',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:12].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.[hash:12].js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new Dotenv(), // Insert environment variables here
    new FaviconsWebpackPlugin({
      logo: './src/img/favicon-original.png',
      statsFilename: 'iconstats-[hash].json',
      inject: true,
      background: '#cc212b',
      title: 'MS-QLD',
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:12].css',
    })
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/js/components'),
      Img: path.resolve(__dirname, './src/img'),
      Scenes: path.resolve(__dirname, './src/js/scenes'),
    },
  },
};
