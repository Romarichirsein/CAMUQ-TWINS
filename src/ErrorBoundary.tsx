import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public props: Props;
  public state: State;
  public setState: any;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in CAMUQ & TWINS EMPIRE application:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4 bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="w-16 h-16 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
              !
            </div>
            <h2 className="text-2xl font-black text-white">CAMUQ & TWINS EMPIRE</h2>
            <p className="text-sm text-slate-300">
              Un problème d'affichage est survenu. Nous vous prions de nous en excuser.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/accueil";
              }}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Recharger la page d'Accueil
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
