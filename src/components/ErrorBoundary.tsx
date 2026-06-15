import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center font-mono text-foreground">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto border-2 border-nothing-red rounded-full flex items-center justify-center">
              <span className="text-nothing-red text-lg">!</span>
            </div>
            <p className="text-nothing-red text-sm tracking-widest uppercase">SYSTEM_ERROR</p>
            <p className="text-muted-foreground text-xs max-w-sm">
              An unexpected error occurred. The system will attempt recovery.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-nothing-red text-nothing-red text-xs hover:bg-nothing-red hover:text-background transition-colors tracking-widest uppercase"
            >
              RELOAD_SYSTEM()
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
