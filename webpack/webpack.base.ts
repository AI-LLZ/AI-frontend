import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import type { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

const BaseConfig: Configuration = {
  entry: "./src/index.tsx",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /(.yarn)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/typescript",
                "@babel/preset-react",
                "@babel/preset-env"
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "js/[name].[contenthash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  target: "web"
};

export default BaseConfig;
