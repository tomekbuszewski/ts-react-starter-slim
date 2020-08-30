const getPaths = require("../moduleAlias");

module.exports = {
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  moduleFileExtensions: ["js", "jsx", "svg", "json", "node", "ts", "tsx"],
  collectCoverage: true,
  moduleNameMapper: getPaths("jest"),
  setupFilesAfterEnv: ["./@config/jest/jest.setup.js"],
};
