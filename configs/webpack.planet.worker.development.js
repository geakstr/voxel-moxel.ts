const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");

const root = path.resolve(__dirname, "../");
const src = path.resolve(root, "./src");
const commonConfig = require("./webpack.planet.worker.base.js");

module.exports = webpackMerge(commonConfig, {
  entry: {
    "planet.worker": path.resolve(src, "./workers/planet.worker.ts")
  },
  output: {
    path: path.resolve(root, "lib/workers"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    sourceMapFilename: "[name].map",
    publicPath: "/"
  },
  devtool: "cheap-source-map",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new CheckerPlugin()
  ]
});
