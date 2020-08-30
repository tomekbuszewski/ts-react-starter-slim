import React from "react";
import { render } from "react-dom";
import { Application } from "@components/Application";

const rootId = "#app";
const root = document.querySelector(rootId);

if (process.env.MOCKS) {
  const { worker } = require("../mocks/browser");
  worker.start();
}

if (root) {
  render(<Application />, root);
} else {
  console.error(`No element ${rootId} found in the document!`);
}
