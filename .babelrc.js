const isTest = String(process.env.NODE_ENV) === "test";

module.exports = {
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
  ],
  presets: [
    "@babel/typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        modules: isTest ? "commonjs" : false,
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          "remove-test-ids",
          {
            attributes: ["data-testid", "data-test-id"],
          },
        ],
      ],
    },
  },
};
