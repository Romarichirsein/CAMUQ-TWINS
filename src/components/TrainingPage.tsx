import React, { useState } from "react";
import * as Icons from "lucide-react";
import { FORMATIONS_DATA, VACATION_TRAINING_EVENT } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface TrainingPageProps {
  onRegister: (formationName: string) => void;
}

export default function TrainingPage({ onRegister }: TrainingPageProps) {
  const [selectedFormation, setSelectedFormation] = useState<typeof FORMATIONS_DATA[0] | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [activeGalleryImage, setActiveGalleryImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const { lang, t } = useLanguage();
  const trT = t.training;

  const levels = ["all", "Débutant", "Intermédiaire", "Expert"];

  const getLevelLabel = (lvl: string) => {
    if (lvl === "all") return trT.allLevels;
    if (lvl === "Débutant") return trT.levelBeginner;
    if (lvl === "Intermédiaire") return trT.levelIntermediate;
    if (lvl === "Expert") return trT.levelExpert;
    return lvl;
  };

  const filteredFormations = filterLevel === "all" 
    ? FORMATIONS_DATA 
    : FORMATIONS_DATA.filter(f => f.level === filterLevel);

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <div id="training-view" className="bg-slate-50 animate-fade-in pb-16">
      
      {/* Full-width Hero Header Banner with Background Image */}
      <div className="relative w-full py-28 sm:py-36 min-h-[380px] sm:min-h-[450px] flex items-center justify-center bg-slate-950 overflow-hidden text-white mb-12 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-training.jpg" 
            alt="Nos Formations CAMUQ & TWINS EMPIRE" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 opacity-95"
          />
          {/* Lightened overlay so background image is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-yellow-400/40 inline-block shadow-md">
            {trT.pageTag}
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight text-balance drop-shadow-lg">
            {trT.pageTitle}
          </h1>
          <p className="text-sm sm:text-lg text-slate-100 leading-relaxed font-medium max-w-3xl mx-auto text-balance drop-shadow-md">
            {trT.pageSubtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* SPECIAL FEATURED SECTION: VACANCES UTILES 2026 */}
        <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-blue-800/40 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-8">
            {/* Header info badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-800/60 pb-6">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-2 bg-yellow-400 text-blue-950 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                  <Icons.Sparkles className="w-4 h-4 fill-blue-950" />
                  {VACATION_TRAINING_EVENT.subtitle}
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight pt-2">
                  {VACATION_TRAINING_EVENT.title}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-blue-900/80 border border-blue-700/60 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl">
                  <Icons.Calendar className="w-4 h-4 text-yellow-400" />
                  {VACATION_TRAINING_EVENT.dates}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl">
                  <Icons.CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {VACATION_TRAINING_EVENT.duration}
                </span>
              </div>
            </div>

            {/* Narrative text requested by user */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium bg-blue-900/40 p-5 rounded-2xl border border-blue-800/50">
                  {VACATION_TRAINING_EVENT.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {VACATION_TRAINING_EVENT.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                      <Icons.Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action box */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center space-y-4 flex flex-col justify-center items-center">
                <div className="p-3 bg-yellow-400/20 rounded-2xl border border-yellow-400/40">
                  <Icons.Award className="w-10 h-10 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Impact & Insertion des Jeunes</h3>
                  <p className="text-xs text-slate-300 mt-1">Initiation pratique réussie pour les enfants de 9 à 17 ans au centre de Nkolfoulou.</p>
                </div>
                <button
                  onClick={() => onRegister("Formation Informatique & Bureautique Jeunes")}
                  className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                >
                  Répéter pour la prochaine session
                </button>
              </div>
            </div>

            {/* Photo Gallery Grid with Zoom Lightbox */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-400 flex items-center gap-2">
                  <Icons.Camera className="w-4 h-4" />
                  Galerie Photos de la Session Vacances Utiles
                </h3>
                <span className="text-xs text-slate-400">Cliquez sur une image pour l&apos;agrandir</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {VACATION_TRAINING_EVENT.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveGalleryImage(img)}
                    className="group relative h-56 rounded-2xl overflow-hidden border border-slate-700/60 shadow-md cursor-pointer bg-slate-800"
                  >
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors">{img.title}</span>
                      <span className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">{img.caption}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Icons.Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Level Filters bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">{trT.filterLevel}</span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filterLevel === lvl
                  ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                  : "bg-white text-gray-600 border border-gray-150 hover:bg-gray-50"
              }`}
            >
              {getLevelLabel(lvl)}
            </button>
          ))}
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map((form) => (
            <div 
              key={form.id} 
              className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-150 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between reveal-scale"
            >
              {/* Image & Ribbon Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img 
                  src={form.image} 
                  alt={form.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] bg-blue-900/90 text-white font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                    {form.level}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-yellow-400 text-blue-950 px-3.5 py-1.5 rounded-2xl shadow-md font-black text-xs uppercase tracking-wider">
                  Sur inscription
                </div>
              </div>

              {/* Training Content */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-yellow-600">
                    <div className="p-1.5 rounded-lg bg-yellow-50 text-yellow-600">
                      {renderIcon(form.icon, "w-4 h-4")}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">Durée : {form.duration}</span>
                  </div>
                  <h3 className="font-sans font-black text-lg sm:text-xl text-blue-950 group-hover:text-blue-900 transition-colors">
                    {form.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {form.description}
                  </p>
                </div>

                {/* Submitting Actions */}
                <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => onRegister(form.name)}
                    className="flex-1 py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer text-center"
                  >
                    S&apos;inscrire Maintenant
                  </button>
                  <button
                    onClick={() => setSelectedFormation(form)}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-900 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer"
                    title="En savoir plus"
                  >
                    <Icons.Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Info Modal */}
        {selectedFormation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-150 overflow-y-auto max-h-[90vh]">
              <button 
                onClick={() => setSelectedFormation(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-950 transition-colors cursor-pointer"
              >
                <Icons.X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
                  <img src={selectedFormation.image} alt={selectedFormation.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-xs bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-100 font-extrabold uppercase">
                      {selectedFormation.level}
                    </span>
                    <span className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full border border-yellow-100 font-extrabold uppercase">
                      {selectedFormation.duration}
                    </span>
                  </div>
                  <h3 className="font-sans font-black text-2xl text-blue-950">{selectedFormation.name}</h3>
                </div>

                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium text-gray-800">{selectedFormation.description}</p>
                  <p>{selectedFormation.longDescription || "Cette formation pratique intensive est jalonnée de cas réels d'entreprise, d'ateliers dirigés et d'un projet final validé par notre jury pour l'obtention de votre certificat professionnel CAMUQ & TWINS EMPIRE d'excellence."}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-widest">Coût d&apos;inscription</span>
                    <span className="text-xl font-black text-blue-900">{selectedFormation.price.toLocaleString()} FCFA</span>
                  </div>
                  <button
                    onClick={() => {
                      onRegister(selectedFormation.name);
                      setSelectedFormation(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                  >
                    Valider mon Inscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Image Lightbox Modal */}
        {activeGalleryImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" onClick={() => setActiveGalleryImage(null)}>
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveGalleryImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-yellow-400 hover:text-blue-950 transition-all cursor-pointer"
              >
                <Icons.X className="w-6 h-6" />
              </button>
              
              <div className="relative max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={activeGalleryImage.url} 
                  alt={activeGalleryImage.title} 
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-yellow-400 tracking-wider">CAMUQ AND TWINS TRAINING — Vacances Utiles 2026</span>
                <h3 className="font-sans font-black text-xl text-white">{activeGalleryImage.title}</h3>
                <p className="text-sm text-slate-300">{activeGalleryImage.caption}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
