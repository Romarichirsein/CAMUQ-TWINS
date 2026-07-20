import React, { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { GALLERY_DATA } from "../data";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { id: "all", label: "Tous nos clichés" },
    { id: "imprimerie", label: "Imprimerie" },
    { id: "formations", label: "Formations" },
    { id: "bureautique", label: "Secrétariat" },
    { id: "autres", label: "Cyber & Autres" }
  ];

  const filteredItems = activeFilter === "all"
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === activeFilter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div id="gallery-view" className="py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Galerie d&apos;Images C&T
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Immersion Visuelle au Cœur de Notre Empire
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Parcourez nos ateliers d&apos;impression numérique, nos salles de cours connectées et découvrez des exemples concrets de projets réalisés pour nos clients.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setLightboxIndex(null);
              }}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeFilter === filter.id
                  ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                  : "bg-slate-50 text-gray-500 hover:bg-slate-100 hover:text-blue-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual Glassmorphic overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5 text-white">
                    <span className="text-[9px] font-extrabold uppercase bg-yellow-400 text-blue-950 px-2 py-0.5 rounded-full inline-block tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-sans font-black text-base sm:text-lg tracking-tight leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-200 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 max-w-sm mx-auto space-y-2">
            <AlertCircle className="w-10 h-10 text-yellow-500 mx-auto" />
            <h4 className="font-bold text-base text-blue-950">Aucun cliché à afficher</h4>
            <p className="text-xs text-gray-400">Modifiez la catégorie sélectionnée pour rafraîchir la galerie.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Slider Controls */}
            <button 
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Picture & metadata */}
            <div 
              className="max-w-4xl w-full flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[70vh] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-white/10 shadow-2xl">
                <img 
                  src={filteredItems[lightboxIndex].image} 
                  alt={filteredItems[lightboxIndex].title} 
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>

              <div className="text-center space-y-2 max-w-2xl px-4">
                <span className="text-[10px] bg-yellow-400 text-blue-950 font-black uppercase px-2.5 py-1 rounded-full tracking-widest inline-block">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
