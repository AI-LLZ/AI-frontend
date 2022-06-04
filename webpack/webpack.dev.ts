import type { Configuration } from "webpack";
import "webpack-dev-server";
import { merge } from "webpack-merge";

import BaseConfig from "./webpack.base";

export default merge<Configuration>(BaseConfig, {
  devServer: {
    compress: true,
    hot: true,
    port: 3000
  },
  devtool: "eval-cheap-module-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});
