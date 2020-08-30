import * as React from "react";
import { IS_DEV } from "@config/config";

import { View } from "./ErrorBoundary.view";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (IS_DEV) {
      console.error(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <View />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
