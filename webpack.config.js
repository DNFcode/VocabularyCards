const webpack = require("webpack")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
  },

  devtool: "source-map",
  mode: "development",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  devServer: {
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["svgr/webpack"],
      },

      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"],
      },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
}
