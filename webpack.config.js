const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // start bundling modules from this file
  entry: "./src/index.js",
  output: {
    // output should be in the 'build' folder
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        // use babel-loader for .js files
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // use style-loader and css-loader for CSS files, enable CSS modules
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  // inject bundle.js into the below located index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
}
