import React from "react";
import { ArrowRight, MessageSquareCode, Calculator, Shield, Users, BookOpen } from "lucide-react";
import { COMPANY_NAME, COMPANY_SLOGAN } from "../data";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero-section" className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Decorative colored grid/shapes */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-450 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-350 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Headline and Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              Bilingual Stationery & Business Empire
            </div>
            
            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-blue-950 tracking-tight leading-[1.1] text-balance">
              {COMPANY_NAME}
            </h1>
            
            <p className="font-sans font-medium text-lg sm:text-xl text-yellow-600 tracking-tight leading-relaxed italic uppercase">
              &ldquo;{COMPANY_SLOGAN}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Propulsez votre entreprise ou votre carrière vers de nouveaux sommets ! 
              Bénéficiez de nos services premium en <strong className="text-blue-900 font-semibold">secrétariat bilingue</strong>, 
              <strong className="text-blue-900 font-semibold">imprimerie numérique</strong> de haute qualité, et de nos <strong className="text-blue-900 font-semibold">formations professionnelles certifiées</strong> 
              allant du design à l'intégration de l'Intelligence Artificielle.
            </p>

            {/* CTA action buttons to drive conversions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onNavigate("estimator")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-extrabold text-base tracking-wide shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-5 h-5 shrink-0" />
                Estimer un Devis Instantané
              </button>
              
              <button
                onClick={() => onNavigate("ai-bot")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-base tracking-wide shadow-lg shadow-blue-950/10 hover:shadow-blue-950/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 border border-blue-850 cursor-pointer"
              >
                <MessageSquareCode className="w-5 h-5 shrink-0 text-yellow-400" />
                Discuter avec l'IA
              </button>
            </div>

            {/* Multi-points highlight ribbon */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="font-sans font-extrabold text-2xl text-blue-950">100%</div>
                <div className="text-xs text-gray-500 mt-1">Bilingue & Qualifié</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-sans font-extrabold text-2xl text-blue-950">8+</div>
                <div className="text-xs text-gray-500 mt-1">Formations Pro</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-sans font-extrabold text-2xl text-blue-950">24h/48h</div>
                <div className="text-xs text-gray-500 mt-1">Livraison Imprimerie</div>
              </div>
            </div>
          </div>

          {/* Feature Highlight Card / Visual Mock */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-sm lg:max-w-none rounded-3xl bg-white border border-gray-100 shadow-2xl shadow-blue-950/10 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-350 to-transparent rounded-tr-3xl opacity-25"></div>
              
              <h3 className="font-sans font-bold text-lg text-blue-950 tracking-tight mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-900" />
                Pourquoi choisir l'Empire ?
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Équipe d'Experts Dévoués</h4>
                    <p className="text-xs text-gray-500 mt-1">Saisie rapide, correction de mémoires et d'excellents rapports bilingues d'une qualité irréprochable.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Cursus de Formation Orientés Emploi</h4>
                    <p className="text-xs text-gray-500 mt-1">Infographie, Marketing digital, Montage Vidéo et Intelligence Artificielle d'application directe en entreprise.</p>
                  </div>
                </div>

                {/* Micro campaign visual */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 text-white space-y-3 shadow-md">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-yellow-400 font-extrabold uppercase tracking-widest">Promotion Spéciale</span>
                    <span className="bg-red-500 px-2 py-0.5 rounded text-[10px] font-black uppercase">OFFRE IA</span>
                  </div>
                  <h4 className="font-bold text-sm leading-snug">
                    Bénéficiez de -15% sur notre formation "Initiation à l'Intelligence Artificielle" !
                  </h4>
                  <button 
                    onClick={() => onNavigate("training")}
                    className="w-full py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-blue-950 text-xs font-black tracking-wide uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Réserver ma place <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
