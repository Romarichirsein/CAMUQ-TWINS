import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "light" | "dark";
}

export default function Logo({ className = "h-12", iconOnly = false, variant = "dark" }: LogoProps) {
  // Brand Colors:
  // Dark Blue: #103A60
  // Gold/Yellow: #E5A823
  // Dark Gray text: #333333

  const textColor = variant === "light" ? "text-white" : "text-slate-800";
  const subTextColor = variant === "light" ? "text-yellow-400" : "text-yellow-600";
  const lineStroke = variant === "light" ? "stroke-white/40" : "stroke-slate-300";

  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 300 170"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Globe Background in deep blue */}
        <circle cx="150" cy="100" r="42" fill="#103A60" />

        {/* Dynamic Stylized Map/Continents in Gold */}
        {/* America shape */}
        <path
          d="M125 78c3-3 8-4 10-1c2 3 0 7 2 9c2 2 4 1 5-1c2-2 1-5-1-6c-1-2 0-4 3-5c2-1 4 1 6-1c2-1 2-5 4-6c2 0 4 3 4 5c0 3 2 4 4 1c1-1 3-2 4-1c2 1 1 4 3 4c1-1 2-4 3-4c1-1 3-1 3 2c0 3-2 5-4 7c-2 2-3 4-2 7c1 3 3 4 4 7c1 2 0 4-2 5c-2 2-4 1-5-1c-1-2-3-2-5-1c-2 1-2 3-4 4c-2 1-3 3-3 5c1 2 2 3 1 5c-1 1-3 0-4-1c-1-2-3-3-4-1c-1 1-2 3-3 3c-2 0-4-2-4-5c0-2 1-3-1-5c-2-2-3-2-5-1c-2 1-2 3-3 4c-2 1-3-1-4-3c-1-2 0-4-2-5c-1-1-1-3 0-4z"
          fill="#E5A823"
        />
        {/* Africa & Europe shape */}
        <path
          d="M158 72c1-2 4-1 5 1c1 2 1 4 3 4c2 0 2-2 3-3c1-1 2-1 4 0c2 1 1 3 3 3c1-1 1-2 2-3c1-1 3 0 3 1c0 2 2 3 1 5c0 2-2 2-3 4c-1 2 1 3 1 5c1 2 0 3-1 5c-1 2-2 2-3 2c-1 0-2-2-3-2c-2 0-2 2-3 3c-1 1-2 2-4 2c-2 0-2-2-3-3c-1-2 0-3-2-4c-2-1-3-1-4 1c-1 1-1 2-2 3c-2 1-3-1-4-3c-1-2 1-4 2-5c2-1 2-3 2-5z"
          fill="#E5A823"
        />

        {/* Left Stylized Human Figure (Dark Blue) */}
        {/* Head */}
        <circle cx="102" cy="70" r="14" fill="#103A60" />
        {/* Body & Arm arching up to the center */}
        <path
          d="M102 92c-6 0-14 4-20 12c-6 8-8 18-8 27c0 0 6-7 14-7c6 0 10 3 13 8c1-10 6-21 13-28c7-7 17-14 26-19c8-4 16-7 24-9l-14-11c-12 5-26 14-36 21c-4 3-8 5-12 7"
          fill="#103A60"
        />

        {/* Right Stylized Human Figure (Gold/Yellow) */}
        {/* Head */}
        <circle cx="198" cy="70" r="14" fill="#E5A823" />
        {/* Body & Arm arching up to the center */}
        <path
          d="M198 92c6 0 14 4 20 12c6 8 8 18 8 27c0 0-6-7-14-7c-6 0-10 3-13 8c-1-10-6-21-13-28c-7-7-17-14-26-19c-8-4-16-7-24-9l14-11c12 5 26 14 36 21c4 3 8 5 12 7"
          fill="#E5A823"
        />

        {/* Hands joining to form the pitched roof arch */}
        <path
          d="M140 45l10-10l10 10"
          stroke="#E5A823"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M130 52c4-3 8-6 12-10"
          stroke="#103A60"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />

        {/* Lower curved horizon line */}
        <path
          d="M60 148c40-7 140-7 180 0"
          stroke="#103A60"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon portion */}
      <div className="shrink-0 w-12 h-12 flex items-center justify-center">
        <svg
          viewBox="0 0 300 170"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Globe Background in deep blue */}
          <circle cx="150" cy="100" r="42" fill="#103A60" />

          {/* Map details in gold */}
          <path
            d="M125 78c3-3 8-4 10-1c2 3 0 7 2 9c2 2 4 1 5-1c2-2 1-5-1-6c-1-2 0-4 3-5c2-1 4 1 6-1c2-1 2-5 4-6c2 0 4 3 4 5c0 3 2 4 4 1c1-1 3-2 4-1c2 1 1 4 3 4c1-1 2-4 3-4c1-1 3-1 3 2c0 3-2 5-4 7c-2 2-3 4-2 7c1 3 3 4 4 7c1 2 0 4-2 5c-2 2-4 1-5-1c-1-2-3-2-5-1c-2 1-2 3-4 4c-2 1-3 3-3 5c1 2 2 3 1 5c-1 1-3 0-4-1c-1-2-3-3-4-1c-1 1-2 3-3 3c-2 0-4-2-4-5c0-2 1-3-1-5c-2-2-3-2-5-1c-2 1-2 3-3 4c-2 1-3-1-4-3c-1-2 0-4-2-5c-1-1-1-3 0-4z"
            fill="#E5A823"
          />
          <path
            d="M158 72c1-2 4-1 5 1c1 2 1 4 3 4c2 0 2-2 3-3c1-1 2-1 4 0c2 1 1 3 3 3c1-1 1-2 2-3c1-1 3 0 3 1c0 2 2 3 1 5c0 2-2 2-3 4c-1 2 1 3 1 5c1 2 0 3-1 5c-1 2-2 2-3 2c-1 0-2-2-3-2c-2 0-2 2-3 3c-1 1-2 2-4 2c-2 0-2-2-3-3c-1-2 0-3-2-4c-2-1-3-1-4 1c-1 1-1 2-2 3c-2 1-3-1-4-3c-1-2 1-4 2-5c2-1 2-3 2-5z"
            fill="#E5A823"
          />

          {/* Left Stylized Human Figure (Dark Blue) */}
          <circle cx="102" cy="70" r="14" fill="#103A60" />
          <path
            d="M102 92c-6 0-14 4-20 12c-6 8-8 18-8 27c0 0 6-7 14-7c6 0 10 3 13 8c1-10 6-21 13-28c7-7 17-14 26-19c8-4 16-7 24-9l-14-11c-12 5-26 14-36 21c-4 3-8 5-12 7"
            fill="#103A60"
          />

          {/* Right Stylized Human Figure (Gold/Yellow) */}
          <circle cx="198" cy="70" r="14" fill="#E5A823" />
          <path
            d="M198 92c6 0 14 4 20 12c6 8 8 18 8 27c0 0-6-7-14-7c-6 0-10 3-13 8c-1-10-6-21-13-28c-7-7-17-14-26-19c-8-4-16-7-24-9l14-11c12 5 26 14 36 21c4 3 8 5 12 7"
            fill="#E5A823"
          />

          {/* Hands joining to form the pitched roof arch */}
          <path
            d="M140 45l10-10l10 10"
            stroke="#E5A823"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M130 52c4-3 8-6 12-10"
            stroke="#103A60"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lower curved horizon line */}
          <path
            d="M60 148c40-7 140-7 180 0"
            stroke="#103A60"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text portion */}
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
