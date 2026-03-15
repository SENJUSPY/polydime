import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-6 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-display text-accent mb-4 uppercase tracking-widest">Something went wrong</h1>
        <p className="text-bg/60 font-body mb-8">
          An unexpected error occurred: {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-8 py-4 bg-accent text-dark font-display uppercase tracking-widest rounded-2xl hover:bg-bg transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
};
