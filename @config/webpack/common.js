const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const Dotenv = require("dotenv-webpack");

const getPaths = require("../moduleAlias");

const PROD = process.env.NODE_ENV === "production";
const MOCKS = Boolean(process.env.MOCKS);
const ENV = PROD ? "production" : "development";

const mode = PROD ? "production" : "development";
const devtool = PROD ? "none" : "inline-source-map";

const resolve = {
  extensions: [".ts", ".tsx", ".js", ".jsx"],
  alias: getPaths(),
};

const entry = ["./src/index.tsx"];

const output = (isProd) => ({
  path: path.resolve("public", "assets"),
  filename: isProd ? "[name].[hash].js" : "[name].js",
  hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
  hotUpdateMainFilename: ".hot/[hash].hot-update.json",
  publicPath: "/assets/",
});

const rules = (isProd) => {
  const cfg = {
    test: /\.[tj]s(x?)$/,
    exclude: /node_modules/,
  };

  return isProd
    ? [
        {
          ...cfg,
          loader: "ts-loader",
        },
      ]
    : [
        {
          ...cfg,
          use: [
            { loader: "babel-loader" },
            { loader: "react-hot-loader/webpack" },
            { loader: "react-docgen-typescript-loader" },
          ],
        },
      ];
};

const optimization = (isProd) => {
  const vendor = isProd
    ? {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
          )[1];

          return `vendor.${packageName.replace("@", "")}`;
        },
      }
    : {
        chunks: "initial",
        test: "vendor",
        name: "vendor",
        enforce: true,
      };

  return {
    minimize: isProd,
    nodeEnv: isProd ? "production" : "development",
    mergeDuplicateChunks: true,
    splitChunks: {
      chunks: "all",
      minSize: 64000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: Infinity,
      automaticNameDelimiter: "-",
      name: true,
      cacheGroups: {
        vendor,
      },
    },
  };
};

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(ENV),
      MOCKS: JSON.stringify(MOCKS),
    },
  }),

  new ManifestPlugin({
    filter: ({ isInitial }) => isInitial,
  }),

  new HtmlWebpackPlugin({
    template: path.resolve("src", "templates", "index.html"),
    filename: path.resolve("public", "index.html"),
    minify: true,
    hash: true,
    inject: "body",
    title: "",
  }),

  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: "async",
  }),

  new Dotenv(),
];

module.exports = {
  entry,
  mode,
  devtool,
  resolve,
  output,
  rules,
  optimization,
  plugins,
};
