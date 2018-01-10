const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const root = path.resolve(__dirname, "../");
const src = path.resolve(root, "./src");

const { NODE_ENV } = process.env;

const babelLoaderQuery = {
  presets: [
    [
      require.resolve("babel-preset-env"),
      {
        targets: {
          browsers: ["last 2 versions"]
        },
        exclude: ["transform-regenerator"],
        modules: false
      }
    ]
  ],
  plugins: [
    require.resolve("babel-plugin-transform-class-properties"),
    require.resolve("babel-plugin-transform-object-rest-spread"),
    require.resolve("babel-plugin-transform-es2015-parameters"),
    require.resolve("babel-plugin-date-fns"),
    [
      require.resolve("babel-plugin-lodash"),
      {
        id: ["lodash", "recompose", "async"]
      }
    ]
  ]
};

module.exports = {
  resolve: {
    extensions: [".ts", ".js", ".json"],
    modules: [path.resolve(root, "node_modules"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve("babel-loader"),
        query: {
          ...babelLoaderQuery,
          plugins: babelLoaderQuery.plugins,
          cacheDirectory: true
        },
        include: src
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: require.resolve("babel-loader"),
            query: babelLoaderQuery
          },
          {
            loader: require.resolve("awesome-typescript-loader"),
            options: {
              configFileName: path.resolve(root, "tsconfig.json"),
              silent: true
            }
          }
        ],
        include: src
      },
      {
        enforce: "pre",
        test: /\.(t|j)s$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(
        root,
        NODE_ENV === "production" ? ".env.production" : ".env"
      ),
      safe: true
    })
  ]
};
