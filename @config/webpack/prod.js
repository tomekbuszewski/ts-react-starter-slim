const Terser = require("terser-webpack-plugin");
const common = require("./common");

module.exports = {
  mode: "production",
  devtool: "none",
  entry: [...common.entry],
  output: { ...common.output(true) },
  resolve: {
    ...common.resolve,
  },
  module: {
    rules: [...common.rules(true)],
  },
  optimization: {
    ...common.optimization(true),
    minimizer: [
      new Terser({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [...common.plugins],
};
