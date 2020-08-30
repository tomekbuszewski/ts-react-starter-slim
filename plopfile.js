const ui = require("./@config/plop/generators/ui");
const redux = require("./@config/plop/generators/redux");
const page = require("./@config/plop/generators/page");

module.exports = (plop) => {
  plop.setGenerator("ui", ui);
  plop.setGenerator("redux", redux);
  plop.setGenerator("page", page);
};
