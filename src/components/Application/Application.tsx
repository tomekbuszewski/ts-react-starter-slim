import React from "react";
import { hot } from "react-hot-loader";

import { ErrorBoundary } from "@components/ErrorBoundary";

const BareApplication = () => (
  <ErrorBoundary>
    <div>Hello</div>
  </ErrorBoundary>
);

export const Application = hot(module)(BareApplication);
