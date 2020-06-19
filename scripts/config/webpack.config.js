// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const pkgJson = require('../internal/pkgJson');
const resolvePath = require('../internal/resolvePath');
const getPublicUrlOrPath = require('../internal/getPublicUrlOrPath');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

// (env: string) => {}
module.exports = (env) => {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';

  // Source maps are resource heavy and can cause out of memory issue for large source files.
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

  const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000', 10,
  );

  // common function to get style loaders
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        },
      );
    }

    return loaders;
  };

  return {
    mode: (isEnvProduction && 'production') || (isEnvDevelopment && 'development') || 'none',
    devtool: isEnvProduction
      ? (shouldUseSourceMap
        ? 'source-map'
        : false)
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: {
      framework: resolvePath('src/index.tsx'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: resolvePath('public/index.html') }),
      new ManifestPlugin(),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*', // required - same as command `eslint ./src/**/* --ext .ts,.tsx,.js,.jsx`
        },
      }),
      isEnvProduction && new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      }),
    ].filter(Boolean),
    module: {
      rules: [{
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.[jt]sx?$/,
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
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvProduction && shouldUseSourceMap,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            }),
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: true,
            }),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ], // oneOf
      }], // rules
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    // devServer: {
    //   port: 3000,
    //   hot: true,
    // },
    output: {
      path: resolvePath((isEnvProduction && 'dist') || (isEnvDevelopment && '.tmp')),
      publicPath: getPublicUrlOrPath(isEnvDevelopment),
      filename: (isEnvProduction && '[name].[contenthash:8].js') || (isEnvDevelopment && '[name].js'),
      chunkFilename: (isEnvProduction && '[name].[contenthash:8].chunk.js') || (isEnvDevelopment && '[name].chunk.js'),
      // publicPath: '/framework',
      library: pkgJson.getLibraryName(),
      libraryTarget: 'umd',
    },
  };
};