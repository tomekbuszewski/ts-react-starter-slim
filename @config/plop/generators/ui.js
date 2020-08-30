const { newFileInfo } = require("../helpers");

module.exports = {
  description: "Create a component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "What kind of component?",
      choices: [
        { name: "atom", value: "Atoms" },
        { name: "molecule", value: "Molecules" },
        { name: "organism", value: "Organisms" },
      ],
    },
    {
      type: "input",
      name: "name",
      message: "What is your component's name?",
    },
  ],
  actions: [
    {
      type: "add",
      path:
        "./src/ui/{{pascalCase type}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
      templateFile: "./@config/plop/templates/ui/Component.tsx.hbs",
      data: newFileInfo,
    },
    {
      type: "add",
      path:
        "./src/ui/{{pascalCase type}}/{{pascalCase name}}/{{pascalCase name}}.styles.tsx",
      templateFile: "./@config/plop/templates/ui/Component.styles.tsx.hbs",
      data: newFileInfo,
    },
    {
      type: "add",
      path:
        "./src/ui/{{pascalCase type}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
      templateFile: "./@config/plop/templates/ui/Component.stories.tsx.hbs",
      data: newFileInfo,
    },
    {
      type: "add",
      path:
        "./src/ui/{{pascalCase type}}/{{pascalCase name}}/{{pascalCase name}}.types.ts",
      templateFile: "./@config/plop/templates/ui/Component.types.ts.hbs",
      data: newFileInfo,
    },
    {
      type: "add",
      path: "./src/ui/{{pascalCase type}}/{{pascalCase name}}/index.ts",
      templateFile: "./@config/plop/templates/ui/index.ts.hbs",
    },
    {
      type: "append",
      path: "./src/ui/{{pascalCase type}}/index.ts",
      template: 'export * from "./{{pascalCase name}}";',
    },
  ],
};
