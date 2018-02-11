module.exports = {
  entry: "./src/index.tsx",
  output: {
      filename: "bundle.js",
      path: __dirname + "/build"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            // 'awesome-typescript-loader',
            'svgr/webpack',
          ],
        },

        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
  },
};