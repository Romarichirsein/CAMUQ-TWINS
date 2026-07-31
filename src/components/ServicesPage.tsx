import React, { useState } from "react";
import * as Icons from "lucide-react";
import { SERVICES_DATA } from "../data";

interface ServicesPageProps {
  onQuoteRequest: (serviceName: string) => void;
  activeFilter?: string;
  setActiveFilter?: (filter: string) => void;
}

export default function ServicesPage({ onQuoteRequest, activeFilter, setActiveFilter }: ServicesPageProps) {
  const [localFilterCat, setLocalFilterCat] = useState<string>("all");
  const [subFilter, setSubFilter] = useState<string>("all");
  
  const filterCat = activeFilter !== undefined ? activeFilter : localFilterCat;
  const setFilterCat = (cat: string) => {
    setSubFilter("all");
    if (setActiveFilter) {
      setActiveFilter(cat);
    } else {
      setLocalFilterCat(cat);
    }
  };

  const categories = [
    { id: "all", label: "Tous nos services" },
    { id: "secretariat", label: "Secrétariat Bilingue" },
    { id: "imprimerie", label: "Impression" },
    { id: "edition", label: "Édition" },
    { id: "commerce", label: "Commerce" },
    { id: "autres", label: "Autre (Cyber, Mobile Money)" },
    { id: "personnalise", label: "Service Personnalisé" }
  ];

  // Impression Sub-tabs
  const impressionSubCategories = [
    { id: "all", label: "Toutes les impressions" },
    { id: "industrial", label: "Industriel (Sur devis)" },
    { id: "communication", label: "Communication (Flyers, cartes...)" },
    { id: "grand-format", label: "Grand Format & Banderoles" },
    { id: "goodies", label: "Goodies Publicitaires (Tasses, stylos...)" },
    { id: "textile", label: "Marquage Textile (T-shirts, polos, pagnes...)" }
  ];

  // Édition Sub-tabs
  const editionSubCategories = [
    { id: "all", label: "Toute l'Édition" },
    { id: "litterature", label: "Littérature Générale" },
    { id: "education", label: "Éducation & Manuels Scolaires" }
  ];

  const filteredServices = SERVICES_DATA.filter(service => {
    if (filterCat !== "all" && service.category !== filterCat) {
      return false;
    }
    if (filterCat === "imprimerie" && subFilter !== "all" && service.subCategory !== subFilter) {
      return false;
    }
    if (filterCat === "edition" && subFilter !== "all" && service.subCategory !== subFilter) {
      return false;
    }
    return true;
  });

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <div id="services-page-view" className="bg-white animate-fade-in pb-16">
      
      {/* Full-width Hero Header Banner with Background Image */}
      <div className="relative w-full py-20 sm:py-28 bg-slate-950 overflow-hidden text-white mb-10 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-services.jpg" 
            alt="Nos Services CAMUQ & TWINS EMPIRE" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Black overlay with opacity as requested */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/85 backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded-full border border-yellow-400/30 inline-block animate-fade-in">
            Nos Prestations & Expertises
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight text-balance">
            Des Services d&apos;Élite Taillés Pour Vos Exigences
          </h1>
          <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-medium max-w-3xl mx-auto text-balance">
            De la papeterie bilingue et l&apos;impression industrielle ou textile, à l&apos;édition littéraire, en passant par le cyber café et la rédaction de rapports/CV.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Main Tab category selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-150 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                filterCat === cat.id
                  ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                  : "bg-slate-50 text-gray-500 hover:text-blue-900 hover:bg-slate-100/80 border border-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub-category Filter Pills for Impression */}
        {filterCat === "imprimerie" && (
          <div className="flex flex-wrap justify-center gap-2 bg-blue-50/60 p-3 rounded-2xl border border-blue-100 animate-slide-down max-w-4xl mx-auto">
            {impressionSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSubFilter(sub.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  subFilter === sub.id
                    ? "bg-yellow-400 text-blue-950 shadow-xs"
                    : "bg-white text-blue-900 hover:bg-yellow-100 border border-blue-100"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Sub-category Filter Pills for Édition */}
        {filterCat === "edition" && (
          <div className="flex flex-wrap justify-center gap-2 bg-yellow-50/60 p-3 rounded-2xl border border-yellow-200 animate-slide-down max-w-2xl mx-auto">
            {editionSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSubFilter(sub.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  subFilter === sub.id
                    ? "bg-blue-900 text-white shadow-xs"
                    : "bg-white text-blue-900 hover:bg-yellow-100 border border-yellow-200"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Services Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="p-6 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-100 hover:border-blue-150 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white flex items-center justify-center border border-blue-100 transition-all duration-300">
                  {renderIcon(service.icon, "w-6 h-6")}
                </div>
                <div>
                  <span className="text-[10px] bg-yellow-100/70 text-yellow-800 border border-yellow-200 font-extrabold uppercase px-2 py-0.5 rounded-full">
                    {service.category === "secretariat" ? "Secrétariat" : service.category === "imprimerie" ? "Imprimerie" : "En ligne & Finances"}
                  </span>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-blue-950 mt-2.5">
                    {service.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-wider">Tarif estimé</span>
                  <span className="text-sm font-extrabold text-blue-900">{service.priceEstimate}</span>
                </div>
                <button
                  onClick={() => onQuoteRequest(service.name)}
                  className="px-4 py-2 bg-white hover:bg-blue-900 hover:text-white text-xs font-black text-blue-900 border border-blue-200 rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  Commander <Icons.ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Focus Section: Cyber Café & Services Financiers (Mobile money, Orange money, Canal+) */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-900 to-blue-950 text-white shadow-xl relative overflow-hidden border border-blue-950">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-350 to-transparent rounded-bl-full opacity-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-6">
              <span className="text-[10px] bg-yellow-400 text-blue-950 font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                Espace Connecté Premium
              </span>
              <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl leading-tight">
                Cyber Café Ultra-Rapide, Mobile Money & Abonnements Canal+
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                Notre espace technologique vous accueille 6 jours sur 7 avec une connexion par fibre optique stable pour toutes vos démarches administratives complexes (Pré-enrôlement passeport, CNI, attestation d&apos;immatriculation).
              </p>
              <p className="text-xs text-blue-200">
                Nous sommes agréés et sécurisés pour tous vos dépôts/retraits MTN Mobile Money, Orange Money et renouvellement Canal+ sans délai ni tracas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Icons.Wifi className="w-8 h-8 text-yellow-400" />
                <h4 className="font-bold text-sm text-white">Fibre Optique Pro</h4>
                <p className="text-[11px] text-blue-200">Recherches, téléchargements lourds et saisies fluides.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Icons.Tv className="w-8 h-8 text-yellow-400" />
                <h4 className="font-bold text-sm text-white">Canal+ Instantané</h4>
                <p className="text-[11px] text-blue-200">Activation immédiate de vos bouquets préférés en boutique.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Icons.DollarSign className="w-8 h-8 text-yellow-400" />
                <h4 className="font-bold text-sm text-white">MoMo & Orange</h4>
                <p className="text-[11px] text-blue-200">Dépôts, retraits et transferts nationaux et internationaux sécurisés.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Icons.FileCheck className="w-8 h-8 text-yellow-400" />
                <h4 className="font-bold text-sm text-white">Démarches en ligne</h4>
                <p className="text-[11px] text-blue-200">Pré-enrôlement passeports et cartes CNI accompagnés.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
