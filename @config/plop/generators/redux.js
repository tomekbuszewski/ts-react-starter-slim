const inquirer = require("inquirer");
const { getReducers } = require("../helpers");

const newReducer = {
  name: "create a new one",
  value: "new",
};

const createNewReducer = [
  {
    type: "add",
    path: "./src/redux/{{camelCase name}}/actions.ts",
    templateFile: "./@config/plop/templates/redux/actions.ts.hbs",
  },
  {
    type: "add",
    path: "./src/redux/{{camelCase name}}/reducer.ts",
    templateFile: "./@config/plop/templates/redux/reducer.ts.hbs",
  },
  {
    type: "add",
    path: "./src/redux/{{camelCase name}}/selectors.ts",
    templateFile: "./@config/plop/templates/redux/selectors.ts.hbs",
  },
  {
    type: "add",
    path: "./src/redux/{{camelCase name}}/typings.ts",
    template: "export type {{pascalCase name}}Reducer = string;",
  },
  {
    type: "add",
    path: "./tests/Integration/Redux/{{camelCase name}}.test.ts",
    templateFile: "./@config/plop/templates/redux/test.ts.hbs",
  },
  {
    type: "append",
    path: "./src/redux/reducers.ts",
    template: 'import {{camelCase name}} from "./{{camelCase name}}/reducer";',
    pattern: /^(.*)/,
  },
  {
    type: "append",
    path: "./src/redux/reducers.ts",
    template: "  {{camelCase name}},\n",
    pattern: "reducers = {",
  },
];

const modifyReducer = [
  {
    type: "modify",
    path: "./src/redux/{{camelCase reducer}}/reducer.ts",
    template: ', {{constantCase actionName}} } from "./actions";',
    pattern: / } from ".\/actions";/,
  },
  {
    type: "modify",
    path: "./src/redux/{{camelCase reducer}}/reducer.ts",
    template: "case {{constantCase actionName}}: return state; default:",
    pattern: /default:/,
  },
  {
    type: "append",
    path: "./src/redux/{{camelCase reducer}}/actions.ts",
    template:
      '\nexport const {{constantCase actionName}} = "{{constantCase reducer}}/{{constantCase actionName}}"',
    pattern: /$/,
  },
  {
    type: "append",
    path: "./src/redux/{{camelCase reducer}}/actions.ts",
    template:
      "export const {{camelCase actionName}} = (dispatch: Dispatch) => dispatch({ type: {{constantCase actionName}} });\n",
    pattern: /$/,
  },
];

module.exports = {
  description: "Create or expand a Redux action and reducer",
  prompts: [
    {
      type: "list",
      name: "reducer",
      message: "Which reducer you want to expand",
      choices: [newReducer, new inquirer.Separator(), ...getReducers()],
    },
    {
      type: "input",
      name: "name",
      message: "What is your reducer's name?",
      validate: (value) =>
        value.length > 2 || "Reducer name has to be longer than 2",
      when: ({ reducer }) => reducer === newReducer.value,
    },
    {
      type: "input",
      name: "actionName",
      message: "What is your action's name?",
      validate: (value) =>
        value.length > 2 || "Action name has to be longer than 2",
      when: ({ reducer }) => reducer !== newReducer.value,
    },
  ],
  actions: ({ reducer }) => {
    if (reducer === newReducer.value) {
      return createNewReducer;
    }

    return modifyReducer;
  },
};
