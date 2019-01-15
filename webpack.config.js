const webpack = require("webpack")
const path = require("path")
const ManifestPlugin = require("webpack-manifest-plugin")
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")

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
        test: /\.svg$/,
        use: "svgr/webpack",
      },

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
        new SWPrecacheWebpackPlugin({
          // By default, a cache-busting query parameter is appended to requests
          // used to populate the caches, to ensure the responses are fresh.
          // If a URL is already hashed by Webpack, then there is no concern
          // about it being stale, and the cache-busting can be skipped.
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: "service-worker.js",
          logger(message) {
            if (message.indexOf("Total precache size is") === 0) {
              // This message occurs for every build and is a bit too noisy.
              return
            }
            console.log(message)
          },
          minify: true,
          navigateFallback: "/index.html",
          staticFileGlobs: ["build/index.html", "build/icon.png"],
          stripPrefix: "build",
          mergeStaticsConfig: true,
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
      ],
}
