const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");

const root = path.resolve(__dirname, "../");
const src = path.resolve(root, "./src");
const commonConfig = require("./webpack.app.base.js");

const { HTTPS = "off" } = process.env;
const shema = HTTPS === "on" ? "https" : "http";
const port = HTTPS === "on" ? 443 : 3000;

module.exports = webpackMerge(commonConfig, {
  entry: {
    app: [
      "react-hot-loader/patch",
      `webpack-dev-server/client?${shema}://localhost:${port}`,
      "webpack/hot/only-dev-server",
      path.resolve(src, "./index.tsx")
    ]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/"
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new CheckerPlugin()
  ]
});
