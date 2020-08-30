const { resolve } = require("../webpack/common");

module.exports = ({ config }) => ({
  ...config,
  resolve: {
    ...config.resolve,
    ...resolve,
  },
});
