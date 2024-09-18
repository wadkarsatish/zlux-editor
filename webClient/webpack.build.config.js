
/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

const path = require('path');
const webpack = require("webpack");
const webpackConfig = require('webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AngularWebpackPlugin;

if (process.env.MVD_DESKTOP_DIR == null) {
  throw new Error('You must specify MVD_DESKTOP_DIR in your environment');
}

const pubPath = "../../../plugins/org.zowe.editor/web/";
process.env.ASSET_PATH = pubPath;

const config = {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, './src/plugin.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../web'),
    filename: '[name].js',
    publicPath: pubPath
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './node_modules/'),
    },
    fallback: {
      "path": false, // require.resolve("path-browserify"),
      "os": false, // require.resolve("os-browserify/browser"),
      "crypto": false, // require.resolve("crypto-browserify"),
      "stream": false, // require.resolve("stream-browserify"),
      "vm": false, // require.resolve("vm-browserify")
    }
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: ['@ngtools/webpack']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'exports-loader?module.exports.toString()',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }, {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets'),
          to: path.resolve('../web/assets')
        },
        {
          from: path.resolve(__dirname, './src/mock'),
          to: path.resolve('../web/mock')
        },
        {
          from: path.resolve(__dirname, './node_modules/monaco-editor/min/vs/editor/editor.main.css'),
          to: path.resolve('../web/assets/monaco/editor/editor.main.css')
        },
        {
          from: path.resolve(__dirname, './node_modules/monaco-editor/min/vs/base'),
          to: path.resolve('../web/assets/monaco/base')
        }
      ]
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new CompressionPlugin({
      threshold: 50000,
      minRatio: 0.8
    }),
    new MonacoWebpackPlugin({ publicPath: pubPath }),
    new AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: './webClient/src/app/app.module.ts#AppModule'
    })
  ]
};

module.exports = new webpackConfig.Config()
  .extend(path.resolve(process.env.MVD_DESKTOP_DIR, 'plugin-config/webpack5.base.js'))
  .merge(config);

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
