import React, { useState } from "react";
import * as Icons from "lucide-react";
import { SERVICES_DATA } from "../data";

interface ServicesPageProps {
  onQuoteRequest: (serviceName: string) => void;
}

export default function ServicesPage({ onQuoteRequest }: ServicesPageProps) {
  const [filterCat, setFilterCat] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tous nos services" },
    { id: "secretariat", label: "Secrétariat Bilingue" },
    { id: "imprimerie", label: "Imprimerie Professionnelle" },
    { id: "autres", label: "Cyber Café & Services en ligne" }
  ];

  const filteredServices = filterCat === "all"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === filterCat);

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <div id="services-page-view" className="py-16 bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Prestations de Services C&T
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Des Services d&apos;Élite Taillés Pour Vos Exigences
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            De la saisie professionnelle bilingue à l&apos;édition grand format de flyers et banderoles publicitaires, ou pour tous vos transferts et démarches administratives officielles en ligne.
          </p>
        </div>

        {/* Tab category selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-150 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                filterCat === cat.id
                  ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                  : "bg-slate-50 text-gray-500 hover:text-blue-900 hover:bg-slate-100/80 border border-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

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
