import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-8">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-display text-bg mb-4 uppercase tracking-tighter">Something went wrong</h1>
          <p className="text-muted/60 font-body mb-8 max-w-md mx-auto">
            An unexpected error occurred. This might be due to a connection issue or a temporary glitch.
          </p>
          <div className="bg-muted/5 border border-muted/10 rounded-2xl p-4 mb-8 max-w-lg w-full overflow-hidden">
            <p className="text-red-400 font-mono text-xs break-all">
              {this.state.error?.message || 'Unknown Error'}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-8 py-4 bg-accent text-dark font-display uppercase tracking-widest rounded-2xl hover:bg-bg transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
