import React from "react";
import { Handshake, ArrowUpRight, ShieldCheck, ExternalLink, Globe, Star } from "lucide-react";

interface PartnerProps {
  id: string;
  name: string;
  fullName: string;
  role: string;
  description: string;
  website?: string;
  logoColor: string;
  imagePath: string;
}

export function AprosacLogo({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Curved path for text */}
        <path id="aprosac-text-path" d="M 32,130 Q 100,195 168,130" />
        {/* Radial background for inner part */}
        <radialGradient id="aprosac-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </radialGradient>
      </defs>

      {/* Main outer ring */}
      <circle cx="100" cy="100" r="82" stroke="#11305C" strokeWidth="6" fill="url(#aprosac-bg)" />
      
      {/* Outer red arch on top */}
      <path
        d="M 28,100 A 72,72 0 0,1 172,100"
        stroke="#E31B23"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Outer dual thin blue arches */}
      <path
        d="M 22,100 A 78,78 0 0,1 178,100"
        stroke="#11305C"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Laptop Illustration (Upper Center) */}
      <g transform="translate(68, 38)">
        {/* Laptop Screen Body */}
        <rect x="5" y="0" width="54" height="36" rx="4" fill="#E5A823" stroke="#11305C" strokeWidth="2" />
        {/* Laptop screen inner bezel */}
        <rect x="8" y="3" width="48" height="27" rx="1" fill="#11305C" />
        
        {/* Screen Content: Bright Sun */}
        <circle cx="32" cy="16" r="6" fill="#E5A823" />
        {/* Sun rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 32 + Math.cos(angle) * 8;
          const y1 = 16 + Math.sin(angle) * 8;
          const x2 = 32 + Math.cos(angle) * 11;
          const y2 = 16 + Math.sin(angle) * 11;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#E5A823"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
        {/* Ground inside screen below the sun */}
        <path d="M 12,28 Q 32,22 52,28" stroke="#E5A823" strokeWidth="2" fill="none" />

        {/* Laptop Keyboard/Base */}
        <path
          d="M 0,36 L 64,36 L 56,48 L 8,48 Z"
          fill="#E5A823"
          stroke="#11305C"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Laptop trackpad */}
        <rect x="24" y="42" width="16" height="4" rx="1" fill="#11305C" />
      </g>

      {/* Human Figures in the Center (below laptop, above ribbon) */}
      <g transform="translate(0, 15)">
        {/* Left figure (navy blue, leaning right) */}
        <g transform="translate(56, 75) rotate(25)">
          <circle cx="0" cy="-14" r="7" fill="#11305C" />
          <path d="M -9,0 C -9,-10 9,-10 9,0 L 7,20 L -7,20 Z" fill="#11305C" />
        </g>

        {/* Right figure (navy blue, leaning left) */}
        <g transform="translate(144, 75) rotate(-25)">
          <circle cx="0" cy="-14" r="7" fill="#11305C" />
          <path d="M -9,0 C -9,-10 9,-10 9,0 L 7,20 L -7,20 Z" fill="#11305C" />
        </g>

        {/* Center figure (red, standing straight) */}
        <g transform="translate(100, 88)">
          <circle cx="0" cy="-16" r="8" fill="#E31B23" />
          <path d="M -11,0 C -11,-12 11,-12 11,0 L 9,24 L -9,24 Z" fill="#E31B23" />
        </g>
      </g>

      {/* Bottom Ribbon / Banner */}
      {/* Behind fold shadows */}
      <path d="M 16,114 L 30,100 L 30,130 Z" fill="#0c2242" />
      <path d="M 184,114 L 170,100 L 170,130 Z" fill="#0c2242" />
      
      {/* Front arched ribbon in deep blue */}
      <path
        d="M 10,106 C 40,86 160,86 190,106 L 180,144 C 150,124 50,124 20,144 Z"
        fill="#11305C"
        stroke="#11305C"
        strokeWidth="1"
      />

      {/* Arched text "APROSAC" inside the banner */}
      <text fill="white" fontSize="13" fontWeight="900" letterSpacing="2.5" fontFamily="sans-serif">
        <textPath href="#aprosac-text-path" startOffset="50%" textAnchor="middle">
          APROSAC
        </textPath>
      </text>

      {/* Stars on the ribbon wings */}
      {/* Left Star */}
      <g transform="translate(28, 114) scale(0.65)">
        <polygon points="10,1 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7" fill="#E5A823" />
      </g>
      {/* Right Star */}
      <g transform="translate(160, 114) scale(0.65)">
        <polygon points="10,1 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7" fill="#E5A823" />
      </g>
    </svg>
  );
}

export function CoactLogo({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Swirly dynamic symbol at the top */}
      <g transform="translate(100, 60)">
        {/* Top/Right Red/Orange Swoosh */}
        <path
          d="M -15,-32 C 15,-42 45,-15 28,12 C 15,25 -5,12 -12,2 C -20,-8 -10,-22 -15,-32 Z"
          fill="url(#coact-red-grad)"
        />
        {/* Bottom/Left Blue Swoosh */}
        <path
          d="M 15,32 C -15,42 -45,15 -28,-12 C -15,-25 5,-12 12,-2 C 20,8 10,22 15,32 Z"
          fill="url(#coact-blue-grad)"
        />
      </g>

      {/* Wordmark "coact" in bold sleek modern lowercase */}
      <text
        x="100"
        y="136"
        textAnchor="middle"
        fill="#1e1e24"
        fontSize="34"
        fontWeight="800"
        fontFamily="'Century Gothic', 'Montserrat', 'Inter', sans-serif"
        letterSpacing="-1"
      >
        coact
      </text>

      {/* Accent row of 9 colored dots underneath "coact" */}
      <g transform="translate(100, 158)">
        {[
          "#702A8C", // Purple
          "#C82586", // Pink
          "#E31B23", // Red
          "#F37021", // Orange
          "#FFC60B", // Yellow
          "#92C83E", // Light Green
          "#00A651", // Green
          "#00ADEF", // Light Blue
          "#0054A6"  // Dark Blue
        ].map((color, index) => {
          // Center the dots. There are 9 dots, spaced by 12px.
          // Center is index 4 at x = 0.
          const x = (index - 4) * 14;
          return (
            <circle
              key={index}
              cx={x}
              cy={0}
              r="4.5"
              fill={color}
              className="transition-transform hover:scale-130 duration-200 cursor-pointer"
            />
          );
        })}
      </g>

      {/* Gradients */}
      <defs>
        <linearGradient id="coact-red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E31B23" />
          <stop offset="100%" stopColor="#FF4136" />
        </linearGradient>
        <linearGradient id="coact-blue-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0054A6" />
          <stop offset="100%" stopColor="#00ADEF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SkyTwinsLogo({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Forest Green Main Color: #0A4D2E or similar premium emerald green */}
      
      {/* 1. Regal Crown at the Top */}
      <g transform="translate(62, 12)">
        {/* Crown base */}
        <path d="M 5,34 L 71,34 L 66,39 L 10,39 Z" fill="#0A4D2E" />
        {/* Crown base pearls */}
        <circle cx="15" cy="36.5" r="1.5" fill="white" />
        <circle cx="27" cy="36.5" r="1.5" fill="white" />
        <circle cx="38" cy="36.5" r="1.5" fill="white" />
        <circle cx="49" cy="36.5" r="1.5" fill="white" />
        <circle cx="61" cy="36.5" r="1.5" fill="white" />

        {/* Crown main body */}
        <path
          d="M 10,34 L 6,12 C 12,18 20,24 25,10 C 31,18 35,26 38,4 C 41,26 45,18 51,10 C 56,24 64,18 70,12 L 66,34 Z"
          fill="#0A4D2E"
        />
        
        {/* Crown tips circles (Pearls) */}
        <circle cx="6" cy="12" r="3.5" fill="#0A4D2E" />
        <circle cx="25" cy="10" r="3.5" fill="#0A4D2E" />
        <circle cx="38" cy="4" r="4.5" fill="#0A4D2E" />
        <circle cx="51" cy="10" r="3.5" fill="#0A4D2E" />
        <circle cx="70" cy="12" r="3.5" fill="#0A4D2E" />

        {/* Interior arches/velvet representation (Subtle line work) */}
        <path d="M 20,34 Q 25,18 38,18 Q 51,18 56,34" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M 10,34 Q 20,26 38,4" stroke="white" strokeWidth="1" fill="none" />
        <path d="M 66,34 Q 56,26 38,4" stroke="white" strokeWidth="1" fill="none" />
      </g>

      {/* 2. Laurel Wreath and Center Circular Crest */}
      <g transform="translate(100, 104)">
        {/* Inner double circular frame */}
        <circle cx="0" cy="-6" r="38" stroke="#0A4D2E" strokeWidth="3" />
        <circle cx="0" cy="-6" r="33" stroke="#0A4D2E" strokeWidth="1" />

        {/* Cameroon Map Outline Silhouette (Inside Circle) */}
        {/* Centered Cameroon silhouette path, very recognizable */}
        <path
          d="M -5,-30 L -1,-25 L 3,-23 L 5,-18 L 10,-12 L 8,-6 L 15,2 L 14,8 L 19,13 L 23,10 L 25,16 L 22,23 L 15,24 L 9,21 L 5,23 L -2,21 L -6,14 L -9,8 L -14,13 L -19,10 L -18,0 L -21,-5 L -17,-11 L -15,-18 L -12,-23 L -8,-25 Z"
          fill="#0A4D2E"
          opacity="0.85"
        />

        {/* Cameroon inner diagonal flag stripes shading */}
        <line x1="-12" y1="20" x2="20" y2="-12" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <line x1="-15" y1="10" x2="10" y2="-15" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <line x1="-2" y1="25" x2="25" y2="-2" stroke="white" strokeWidth="1.5" opacity="0.4" />

        {/* Laurel Wreaths framing the circle (Left side) */}
        <g transform="scale(1, 1)">
          {/* Stem left */}
          <path d="M -39,12 C -54,0 -52,-25 -32,-41" stroke="#0A4D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Leaves left */}
          {[-35, -25, -15, -5, 5, 15].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const lx = -46 + Math.sin(rad) * 4;
            const ly = -18 + Math.cos(rad) * 22;
            return (
              <g key={i} transform={`translate(${lx}, ${ly}) rotate(${-30 - i * 15})`}>
                <path d="M 0,0 C -5,-12 5,-12 0,0" fill="#0A4D2E" />
                <path d="M 0,0 C -8,-4 -8,4 0,0" fill="#0A4D2E" />
              </g>
            );
          })}
        </g>

        {/* Laurel Wreaths framing the circle (Right side) */}
        <g transform="scale(-1, 1)">
          {/* Stem right */}
          <path d="M -39,12 C -54,0 -52,-25 -32,-41" stroke="#0A4D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Leaves right */}
          {[-35, -25, -15, -5, 5, 15].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const lx = -46 + Math.sin(rad) * 4;
            const ly = -18 + Math.cos(rad) * 22;
            return (
              <g key={i} transform={`translate(${lx}, ${ly}) rotate(${-30 - i * 15})`}>
                <path d="M 0,0 C -5,-12 5,-12 0,0" fill="#0A4D2E" />
                <path d="M 0,0 C -8,-4 -8,4 0,0" fill="#0A4D2E" />
              </g>
            );
          })}
        </g>
      </g>

      {/* 3. Classic Banner Ribbon at the Bottom */}
      {/* Shadow folds */}
      <path d="M 22,154 L 35,138 L 35,170 Z" fill="#052416" />
      <path d="M 178,154 L 165,138 L 165,170 Z" fill="#052416" />

      {/* Fishtail ends left & right */}
      <path d="M 8,146 L 22,138 L 22,168 L 8,160 L 15,153 Z" fill="#083E25" stroke="#0A4D2E" strokeWidth="1" />
      <path d="M 192,146 L 178,138 L 178,168 L 192,160 L 185,153 Z" fill="#083E25" stroke="#0A4D2E" strokeWidth="1" />

      {/* Main banner block */}
      <path
        d="M 18,143 C 60,136 140,136 182,143 L 174,173 C 140,166 60,166 26,173 Z"
        fill="#0A4D2E"
        stroke="#0A4D2E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Serif typography for SKY TWINS arched slightly or centered */}
      <text
        x="100"
        y="160"
        textAnchor="middle"
        fill="white"
        fontSize="12.5"
        fontWeight="bold"
        fontFamily="Times New Roman, Georgia, serif"
        letterSpacing="1.2"
      >
        SKY TWINS
      </text>
    </svg>
  );
}

export default function PartnersSection() {
  const partners: PartnerProps[] = [
    {
      id: "sky-twins",
      name: "SKY TWINS",
      fullName: "Sky Twins Services",
      role: "Partenaire Import-Export & Services Généraux",
      description: "Collaboration stratégique facilitant le transit international, l'approvisionnement en fournitures d'exception et le déploiement logistique sans frontières.",
      logoColor: "border-emerald-500/20 hover:border-emerald-500 bg-emerald-50/10 hover:bg-emerald-50/30",
      imagePath: "/images/sky-twins.jpg"
    },
    {
      id: "aprosac",
      name: "APROSAC",
      fullName: "APROSAC Association",
      role: "Partenaire Social & Développement Communautaire",
      description: "Alliance dédiée à la promotion de l'excellence, l'autonomisation des femmes et l'insertion professionnelle par des cycles de formation certifiés.",
      logoColor: "border-blue-500/20 hover:border-blue-500 bg-blue-50/10 hover:bg-blue-50/30",
      imagePath: "/images/aprosac.jpg"
    },
    {
      id: "coact",
      name: "COACT",
      fullName: "COACT Technologies",
      role: "Partenaire Solutions Numériques & Bureautique",
      description: "Soutien technologique de pointe pour l'intégration de progiciels, l'édition moderne de thèses/rapports et l'infographie propulsée par l'intelligence artificielle.",
      logoColor: "border-purple-500/20 hover:border-purple-500 bg-purple-50/10 hover:bg-purple-50/30",
      imagePath: "/images/coact.jpg"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 font-sans relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-900">
            <Handshake className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Synergie de Croissance</span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight leading-tight">
            Nos Partenaires de Confiance
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Pour bâtir un empire sans frontières, nous nous entourons d'institutions et de marques d'excellence. Ensemble, nous créons de la valeur et offrons des solutions robustes à notre communauté.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`flex flex-col justify-between bg-white rounded-3xl p-8 border text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${partner.logoColor} relative group`}
            >
              {/* Corner badge deco */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-slate-400" />
              </div>

              {/* Logo container */}
              <div className="w-44 h-44 mx-auto flex items-center justify-center rounded-2xl bg-white border border-slate-100 p-4 shadow-sm group-hover:scale-105 transition-all duration-300 overflow-hidden">
                <img
                  src={partner.imagePath}
                  alt={`Logo ${partner.name}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    // Fallback to SVG if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'block';
                    }
                  }}
                />
                <div style={{ display: 'none' }} className="w-full h-full">
                  {partner.id === "aprosac" && <AprosacLogo className="w-full h-full" />}
                  {partner.id === "coact" && <CoactLogo className="w-full h-full" />}
                  {partner.id === "sky-twins" && <SkyTwinsLogo className="w-full h-full" />}
                </div>
              </div>

              {/* Partner description */}
              <div className="mt-8 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight group-hover:text-blue-900 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-yellow-600 font-extrabold uppercase tracking-widest">
                    {partner.role}
                  </p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed min-h-[80px]">
                  {partner.description}
                </p>
              </div>

              {/* Alliance Trust badge */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Alliance Certifiée active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer engagement text */}
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-400 inline-flex items-center gap-1.5 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            Vous souhaitez rejoindre l&apos;Alliance sans Frontières de C&T Empire ? 
            <a
              href="#contact"
              onClick={(e) => {
                // If on homepage or about page, handle contact redirection
                const contactEl = document.getElementById("contact-view");
                if (contactEl) {
                  e.preventDefault();
                  contactEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="font-bold text-blue-900 hover:text-yellow-600 transition-colors underline inline-flex items-center gap-0.5"
            >
              Contactez notre équipe <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
