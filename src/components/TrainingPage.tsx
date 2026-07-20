import React, { useState } from "react";
import * as Icons from "lucide-react";
import { FORMATIONS_DATA } from "../data";

interface TrainingPageProps {
  onRegister: (formationName: string) => void;
}

export default function TrainingPage({ onRegister }: TrainingPageProps) {
  const [selectedFormation, setSelectedFormation] = useState<typeof FORMATIONS_DATA[0] | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>("all");

  const levels = ["all", "Débutant", "Intermédiaire", "Tous niveaux"];

  const filteredFormations = filterLevel === "all" 
    ? FORMATIONS_DATA 
    : FORMATIONS_DATA.filter(f => f.level === filterLevel);

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <div id="training-view" className="py-16 bg-slate-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page title header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-600 bg-yellow-100/60 px-3 py-1.5 rounded-full border border-yellow-200">
            Formations Professionnelles Certifiantes
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Propulsez Votre Carrière avec l&apos;Élite
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Des cursus immersifs et 100% pratiques animés par des experts. Conçus pour vous donner les compétences opérationnelles les plus recherchées par les recruteurs et investisseurs.
          </p>
        </div>

        {/* Level Filters bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">Niveau :</span>
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
              {lvl === "all" ? "Tous les Niveaux" : lvl}
            </button>
          ))}
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map((form) => (
            <div 
              key={form.id} 
              className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-150 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
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
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-2xl shadow-md border border-gray-150">
                  <span className="text-sm font-black text-blue-950">
                    {form.price.toLocaleString()} <span className="text-[10px] text-gray-400 font-bold">FCFA</span>
                  </span>
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
                  <p>{selectedFormation.longDescription || "Cette formation pratique intensive est jalonnée de cas réels d'entreprise, d'ateliers dirigés et d'un projet final validé par notre jury pour l'obtention de votre certificat professionnel C&T d'excellence."}</p>
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

      </div>
    </div>
  );
}
