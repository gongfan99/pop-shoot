const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';
  const isInline = !devMode;
  return ({
    target: 'web',
    entry: ['./entrypoint.js'],
    output: {
      filename: 'js/[name].bundle.js', // 'js/[name].[contenthash:8].js', 'js/[name].bundle.js'
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    ...( devMode? {devtool: 'eval-cheap-module-source-map'} : {} ),
    plugins: [
      devMode? null : new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css"
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        templateParameters: { isInline },
        filename: path.resolve(__dirname, "build/index.html"),
        inject: false,
        title: "pop-shoot",
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env", { 
                    "targets": { "chrome": "70" },
                }]
              ],
            },
          },
          sideEffects: false,
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: devMode? "style-loader" : MiniCssExtractPlugin.loader,
            },
            "css-loader",
            "sass-loader",
          ],
          sideEffects: true,
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|svg|ogg)(\?v=\d+\.\d+\.\d+)?$/,
          type: isInline? 'asset/inline' : 'asset/resource',
        },
        {
          test: /\.wasm$/,
          type: isInline? 'asset/inline' : 'asset/resource',
        },
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
      ],
    },
    devServer: {
      port: 3000,
      static: path.resolve(__dirname, 'build'),
      hot: true,
      historyApiFallback: true,
    },
    watchOptions: {
      aggregateTimeout: 200,
      ignored: /node_modules/,
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    stats: {
      colors: true,
      all: false,
      assets: false,
      builtAt: false,
      cached: false,
      children: false,
      chunks: true,
      chunkOrigins: false,
      entrypoints: false,
      errorDetails: true,
      hash: false,
      modules: true,
      reasons: true,
    },
  });
}