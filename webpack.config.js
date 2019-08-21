const webpack = require("webpack")
const path = require("path")
const ManifestPlugin = require("webpack-manifest-plugin")
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")
const OfflinePlugin = require("offline-plugin")

const devMode = process.env.NODE_ENV === "development"

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "build"),
    publicPath: "/",
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  devServer: {
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    contentBase: path.join(__dirname, "build"),
    hot: true,
    hotOnly: true,
    index: "/index.html",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "awesome-typescript-loader",
          options: {
            useBabel: true,
            babelOptions: {
              babelrc: false,
              plugins: devMode ? ["react-hot-loader/babel"] : [],
            },
            babelCore: "@babel/core",
          },
        },
      },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },

  plugins: devMode
    ? [new webpack.HotModuleReplacementPlugin()]
    : [
        new ManifestPlugin({
          fileName: "asset-manifest.json",
        }),
        new OfflinePlugin(),
      ],
}
