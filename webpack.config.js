const webpack = require("webpack")

const devMode = process.env.NODE_ENV === "development"

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  devServer: {
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    index: "./build/index.html",
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
              plugins: devMode
                ? ["emotion", "react-hot-loader/babel"]
                : ["emotion"],
            },
            babelCore: "@babel/core",
          },
        },
      },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },

  plugins: devMode ? [new webpack.HotModuleReplacementPlugin()] : [],
}
