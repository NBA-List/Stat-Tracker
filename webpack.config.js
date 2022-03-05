const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");
const path = require("path");

module.exports = {
  entry: [path.resolve(__dirname, "client", "index.js")],
  output: { path: path.resolve(__dirname, "build"), filename: "bundle.js" },
  mode: process.env.NODE_ENV,
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    proxy: { "/asdfasdf/**": "http://localhost:3000" },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html"),
      filename: "index.html",
    }),
    new DotenvWebpackPlugin(),
  ],
};
