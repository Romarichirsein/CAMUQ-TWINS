import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, MapPin, Award, Gift, Phone, MessageSquare, ExternalLink } from "lucide-react";

interface AnnouncementModalProps {
  onNavigateToTraining: () => void;
}

export default function AnnouncementModal({ onNavigateToTraining }: AnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Show modal automatically after 800ms
    const showTimer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // 10-second countdown timer
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsOpen(false);
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Bonjour CAMUQ & TWINS TRAINING, je souhaite me pré-inscrire pour la rentrée académique du Lundi 14 Septembre 2026 à 7h30 et bénéficier de la remise de 5%."
    );
    window.open(`https://wa.me/237675231283?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 10-second Animated Progress Bar */}
        <div className="w-full bg-slate-100 h-2 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 via-emerald-500 to-blue-900 transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          ></div>
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-yellow-400">
              Annonce Officielle — Rentrée 2026-2027
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              Fermeture automatique dans <strong className="text-yellow-400">{timeLeft}s</strong>
            </span>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-grow">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Flyer Image Column */}
            <div className="lg:col-span-5 relative group">
              <div 
                className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 cursor-pointer relative"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img 
                  src="/images/affiche-rentree-2026.jpg" 
                  alt="Affiche Officielle Rentrée Académique 2026-2027 CAMUQ & TWINS TRAINING"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-[2px]">
                  <ExternalLink className="w-4 h-4" /> Cliquer pour agrandir
                </div>
              </div>
            </div>

            {/* Description & Details Column */}
            <div className="lg:col-span-7 space-y-4 text-slate-800">
              
              {/* Header Badges */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-900 text-white px-2.5 py-1 rounded-md">
                    CFP C&T-T
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" /> Agréé par le MINEFOP
                  </span>
                </div>
                <h3 className="font-sans font-black text-xl sm:text-2xl text-blue-950 tracking-tight leading-snug">
                  CENTRE DE FORMATION PROFESSIONNELLE CAMUQ AND TWINS TRAINING
                </h3>
                <p className="text-xs text-slate-500 italic">
                  Ambition — Compétence — Réalisation
                </p>
              </div>

              {/* Rentrée Date Highlight Card */}
              <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white p-4 rounded-2xl border border-blue-800 shadow-md space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-extrabold text-xs uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> Rentrée Académique 2026-2027
                </div>
                <div className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  LUNDI 14 SEPTEMBRE 2026 À 7H30
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Campus de Nkolfoulou — Face Ndanga Hotel, Yaoundé</span>
                </div>
              </div>

              {/* Programs Summary */}
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="font-semibold text-slate-900">
                  Formations Diplômantes (DQP) & Certifiantes (CQP) :
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <strong className="text-blue-900 block font-bold">Diplôme DQP :</strong>
                    Secrétariat, Comptabilité, Infographie, Développement App, Réseaux & Webmestre.
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <strong className="text-blue-900 block font-bold">Certificat CQP :</strong>
                    IA, Marketing Digital, Cybersécurité, Montage Vidéo & Langues (Anglais, Chinois, Français).
                  </div>
                </div>
              </div>

              {/* Special Promotion Badge */}
              <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-2xl flex items-center gap-3 text-yellow-950 shadow-sm">
                <div className="p-2 bg-yellow-400 text-blue-950 rounded-xl shrink-0 font-black">
                  <Gift className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-black text-red-600 uppercase block">EN PROMOTION !</span>
                  <strong>Une remise de 5% est offerte</strong> aux 5 premiers candidats qui paieront en totalité leur pension !
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-900" />
            <span>Tél: <strong>675 23 12 83</strong> / <strong>656 49 62 36</strong></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateToTraining();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Voir le programme complet
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-yellow-400" />
              Réserver via WhatsApp
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox image zoom modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <button 
              onClick={() => setIsZoomed(false)}
              className="absolute -top-10 right-0 text-white p-2 hover:text-yellow-400 font-bold text-sm flex items-center gap-1 cursor-pointer"
            >
              <X className="w-6 h-6" /> Fermer l&apos;image
            </button>
            <img 
              src="/images/affiche-rentree-2026.jpg" 
              alt="Affiche Officielle Agrandie" 
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
