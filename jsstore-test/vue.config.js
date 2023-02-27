export const publicPath = "/";
export const configureWebpack = {
  resolve: {
    extensions: [".ts", ".js", ".mjs"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
