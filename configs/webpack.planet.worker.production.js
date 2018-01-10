const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const MinifyPlugin = require("babel-minify-webpack-plugin");

const root = path.resolve(__dirname, "../");
const src = path.resolve(root, "./src");
const commonConfig = require("./webpack.planet.worker.base.js");

const { SOURCE_MAP_EXPLORER } = process.env;

module.exports = webpackMerge(commonConfig, {
  bail: true,
  entry: {
    "planet.worker": path.resolve(src, "./world/planet.worker.ts")
  },
  output: {
    path: path.resolve(root, "lib/workers"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    sourceMapFilename: "[name].map",
    publicPath: "/"
  },
  devtool: SOURCE_MAP_EXPLORER ? "source-map" : "cheap-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    SOURCE_MAP_EXPLORER ? null : new MinifyPlugin({}, {})
  ].filter(p => p)
});
