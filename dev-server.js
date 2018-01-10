const http = require("http");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require(path.resolve(__dirname, "./webpack.development.js"));

const shema = "http";
const port = 3000;

const wds = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: path.resolve(__dirname, "src"),
  hot: true,
  historyApiFallback: true,
  stats: "errors-only",
  overlay: true
});

wds.listen(port, "localhost", (err, result) => {
  if (err) return console.error(err);
  console.log(`Web listening at ${shema}://localhost:${port}/`);
});
