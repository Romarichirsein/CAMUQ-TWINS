import React from "react";
import { Phone, Mail, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { COMPANY_NAME, COMPANY_SLOGAN, COMPANY_EMAIL, COMPANY_PHONES } from "../data";
import Logo from "./Logo";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-gradient-to-b from-slate-900 to-slate-950 text-gray-350 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo, tagline and direct branding */}
          <div className="space-y-4">
            <div>
              <Logo variant="light" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed italic">
              &ldquo;{COMPANY_SLOGAN}&rdquo;
            </p>
            <p className="text-xs text-gray-500">
              Votre partenaire de confiance en Papeterie Bilingue, Imprimerie et Formations Professionnelles d'Élite au Cameroun et au-delà.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-yellow-400 pl-3">
              Ressources & Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-yellow-400" /> Accueil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("services")} className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-yellow-400" /> Services de Bureau & Imprimerie
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("training")} className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-yellow-400" /> Formations Certifiantes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("estimator")} className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-yellow-400" /> Calculateur de Tarifs & Devis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("ai-bot")} className="hover:text-yellow-400 transition-colors flex items-center gap-2 text-gray-400">
                  <ArrowRight className="w-3 h-3 text-yellow-400" /> Assistant Intelligent (IA)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Channels */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-yellow-400 pl-3">
              Canaux de Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />
                <div className="flex flex-col">
                  <a href={`tel:${COMPANY_PHONES[0].replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-medium">
                    {COMPANY_PHONES[0]}
                  </a>
                  <a href={`tel:${COMPANY_PHONES[1].replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-medium">
                    {COMPANY_PHONES[1]}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white transition-colors break-all font-medium">
                  {COMPANY_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-300">Lundi - Samedi</p>
                  <p className="text-xs text-gray-500">07:30 - 19:30 (Heure Locale)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Security & Partners / Operators */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-yellow-400 pl-3">
              Services & Partenaires
            </h3>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Nous opérons les transferts de fonds via MTN Mobile Money & Orange Money, les abonnements Canal+, et le pré-enrôlement CNI/Passeport officiels.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-800 text-yellow-400 text-[10px] font-bold px-2 py-1 rounded border border-slate-700">MTN MoMo</span>
              <span className="bg-slate-800 text-orange-400 text-[10px] font-bold px-2 py-1 rounded border border-slate-700">Orange Money</span>
              <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded border border-slate-700">Canal+</span>
              <span className="bg-slate-800 text-teal-400 text-[10px] font-bold px-2 py-1 rounded border border-slate-700">Longrich</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Paiement & Service 100% Sécurisé</span>
            </div>
          </div>
        </div>

        {/* Divider line & credits */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 transition-colors">Bilingual Services</span>
            <span>&bull;</span>
            <span className="hover:text-gray-300 transition-colors">Digital Printing</span>
            <span>&bull;</span>
            <span className="hover:text-gray-300 transition-colors">AI & Tech Formations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
