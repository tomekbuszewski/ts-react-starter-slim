const { newFileInfo } = require("../helpers");

module.exports = {
  description: "Create a page",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What is your page's name?",
    },
  ],
  actions: [
    {
      type: "add",
      path: "./src/pages/{{pascalCase name}}/{{pascalCase name}}.tsx",
      templateFile: "./@config/plop/templates/page/Page.tsx.hbs",
      data: newFileInfo,
    },
    {
      type: "add",
      path: "./src/pages/{{pascalCase name}}/{{pascalCase name}}.view.tsx",
      templateFile: "./@config/plop/templates/page/Page.view.tsx.hbs",
      data: newFileInfo,
    },
    {
      type: "add",
      path: "./src/pages/{{pascalCase name}}/index.ts",
      templateFile: "./@config/plop/templates/page/index.ts.hbs",
      data: newFileInfo,
    },
  ],
};
