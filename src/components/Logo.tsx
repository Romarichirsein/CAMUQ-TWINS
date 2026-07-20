import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "light" | "dark";
}

export default function Logo({ className = "h-12", iconOnly = false, variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-slate-800";
  const subTextColor = variant === "light" ? "text-yellow-400" : "text-yellow-600";

  if (iconOnly) {
    return (
      <div className={`relative inline-block ${className}`}>
        <img
          src="/images/logo.jpg"
          alt="CAMUQ & TWINS EMPIRE Logo"
          className="w-full h-full object-contain rounded-xl shadow-xs"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brand Logo Image */}
      <div className="shrink-0 h-11 w-11 flex items-center justify-center rounded-xl bg-white p-0.5 border border-slate-200/60 shadow-xs overflow-hidden">
        <img
          src="/images/logo.jpg"
          alt="CAMUQ & TWINS EMPIRE Logo"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className={`font-sans font-black text-base sm:text-lg tracking-tight leading-none ${textColor}`}>
          CAMUQ & TWINS
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className={`h-[1px] w-3 ${variant === "light" ? "bg-yellow-400/40" : "bg-slate-300"}`}></div>
          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-none ${subTextColor}`}>
            Empire Ltd
          </span>
          <div className={`h-[1px] w-3 ${variant === "light" ? "bg-yellow-400/40" : "bg-slate-300"}`}></div>
        </div>
      </div>
    </div>
  );
}

