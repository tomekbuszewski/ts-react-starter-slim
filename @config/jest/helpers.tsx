import * as React from "react";
import { render } from "@testing-library/react";


const renderWithDeps = (ui: React.ReactElement) => render(ui);

export { renderWithDeps };
