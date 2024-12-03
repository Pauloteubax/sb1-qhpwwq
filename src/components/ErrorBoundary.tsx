import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg inline-block">
            Une erreur inattendue s'est produite. Veuillez rafraîchir la page.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}