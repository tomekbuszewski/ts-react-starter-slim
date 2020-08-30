import * as React from "react";
import { ThemeProvider } from "styled-components";
import { addDecorator, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { GlobalStyle } from "../../src/ui/GlobalStyle";
import { theme } from "../../src/ui/theme";

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      {story()}
    </React.Fragment>
  </ThemeProvider>
));

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  options: {
    showRoots: true,
  },
});
