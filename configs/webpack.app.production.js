const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJS = require("uglify-js");

const root = path.resolve(__dirname, "../");
const src = path.resolve(root, "./src");
const commonConfig = require("./webpack.app.base.js");

const { SOURCE_MAP_EXPLORER } = process.env;

module.exports = webpackMerge(commonConfig, {
  bail: true,
  entry: {
    app: path.resolve(src, "./index.tsx"),
    planetWorker: path.resolve(src, "./world/planet.worker.ts")
  },
  output: {
    path: path.resolve(root, "lib"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    sourceMapFilename: "[name].[chunkhash].map",
    publicPath: "/"
  },
  devtool: SOURCE_MAP_EXPLORER ? "source-map" : "cheap-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(src, "./assets"),
        to: path.resolve(root, "./lib/assets")
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    SOURCE_MAP_EXPLORER ? null : new MinifyPlugin({}, {})
  ].filter(p => p)
});
