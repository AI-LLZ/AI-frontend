import CssMinimizerWebpackPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";

import BaseConfig from "./webpack.base";

export default merge<Configuration>(BaseConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: ["...", new CssMinimizerWebpackPlugin()],
    splitChunks: {
      chunks: "all",
      name: "vendor"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" })
  ]
});
