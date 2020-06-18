const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  // mode: 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html') }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*', // required - same as command `eslint ./src/**/* --ext .ts,.tsx,.js,.jsx`
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  // devServer: {
  //   port: 3000,
  //   hot: true,
  // },
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/framework',
    library: 'reactMicroserviceFramework',
    libraryTarget: 'umd',
  },
};
