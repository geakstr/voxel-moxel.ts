const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const root = path.resolve(__dirname, "./");
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
    ],
    require.resolve("babel-preset-react")
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
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve(root, "node_modules"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        query: {
          ...babelLoaderQuery,
          plugins: babelLoaderQuery.plugins.concat(
            require.resolve("react-hot-loader/babel")
          ),
          cacheDirectory: true
        },
        include: src
      },
      {
        test: /\.tsx$/,
        loaders: [
          {
            loader: require.resolve("react-hot-loader/webpack")
          },
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
        test: /\.(t|j)sx?$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(c|sa|sc)ss$/,
        loaders: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              camelCase: true,
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: [
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          },
          {
            loader: "file-loader",
            options: {
              name(file) {
                if (process.env.NODE_ENV === "development") {
                  return "[path][name].[ext]";
                }

                return "[hash].[ext]";
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: module =>
        module.context && module.context.indexOf("node_modules") !== -1
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(src, "./index.html"),
      chunksSortMode: "dependency"
    }),
    new Dotenv({
      path: path.resolve(
        root,
        NODE_ENV === "production" ? ".env.production" : ".env"
      ),
      safe: true
    })
  ]
};
