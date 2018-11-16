const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "vue-stripe-better-elements",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".js", ".vue"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      uglifyOptions: { ecma: 8 },
      compress: {
        warnings: false
      }
    })
  ]
}
