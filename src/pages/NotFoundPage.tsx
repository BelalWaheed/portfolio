import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Compass } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center mb-6 text-emerald-400">
        <Compass size={36} />
      </div>
      <div className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
        Error 404
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
        The requested page does not exist or has been relocated within the portfolio architecture.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 active:scale-95"
      >
        <ArrowLeft size={18} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};
