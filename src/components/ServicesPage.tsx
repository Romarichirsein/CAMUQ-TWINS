import React, { useState } from "react";
import * as Icons from "lucide-react";
import { SERVICES_DATA } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface ServicesPageProps {
  onQuoteRequest: (serviceName: string) => void;
  activeFilter?: string;
  setActiveFilter?: (filter: string) => void;
}

export default function ServicesPage({ onQuoteRequest, activeFilter, setActiveFilter }: ServicesPageProps) {
  const [localFilterCat, setLocalFilterCat] = useState<string>("all");
  const [subFilter, setSubFilter] = useState<string>("all");
  
  const { lang, t } = useLanguage();
  const sT = t.servicesSection;

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
    { id: "imprimerie", label: "🖨️ " + sT.tabImpression },
    { id: "edition", label: "📚 " + sT.tabEdition },
    { id: "all", label: sT.tabAll },
    { id: "secretariat", label: sT.tabSecretariat },
    { id: "commerce", label: sT.tabCommerce },
    { id: "autres", label: sT.tabAutre },
    { id: "personnalise", label: sT.tabPersonnalise }
  ];

  // Impression Sub-tabs
  const impressionSubCategories = [
    { id: "all", label: sT.tabAll },
    { id: "industrial", label: sT.impIndustrial },
    { id: "communication", label: sT.impCommunication },
    { id: "grand-format", label: sT.impGrandFormat },
    { id: "goodies", label: sT.impGoodies },
    { id: "textile", label: sT.impTextile }
  ];

  // Édition Sub-tabs
  const editionSubCategories = [
    { id: "all", label: sT.tabAll },
    { id: "litterature", label: sT.edLitterature },
    { id: "education", label: sT.edEducation }
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
      <div className="relative w-full py-28 sm:py-36 min-h-[380px] sm:min-h-[450px] flex items-center justify-center bg-slate-950 overflow-hidden text-white mb-10 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-services.jpg" 
            alt="Nos Services CAMUQ & TWINS EMPIRE" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 opacity-95"
          />
          {/* Lightened overlay so background image is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-yellow-400/40 inline-block shadow-md">
            {sT.tabAll}
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight text-balance drop-shadow-lg">
            {sT.pageTitle}
          </h1>
          <p className="text-sm sm:text-lg text-slate-100 leading-relaxed font-medium max-w-3xl mx-auto text-balance drop-shadow-md">
            {sT.pageSubtitle}
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
                {service.coverImage ? (
                  <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200/80 group-hover:shadow-xl transition-all duration-300">
                    <img 
                      src={service.coverImage} 
                      alt={service.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
                    {service.badge && (
                      <span className="absolute top-3 left-3 text-[10px] bg-yellow-400 text-blue-950 font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                        {service.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-bold text-yellow-300 drop-shadow">{service.priceEstimate}</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white flex items-center justify-center border border-blue-100 transition-all duration-300">
                    {renderIcon(service.icon, "w-6 h-6")}
                  </div>
                )}

                <div>
                  {service.category !== "personnalise" && (
                    <span className="text-[10px] bg-yellow-100/70 text-yellow-800 border border-yellow-200 font-extrabold uppercase px-2 py-0.5 rounded-full">
                      {service.category === "secretariat" 
                        ? "Secrétariat" 
                        : service.category === "imprimerie" 
                        ? "Imprimerie" 
                        : service.category === "edition"
                        ? (service.subCategory === "litterature" ? "Littérature Générale" : "Éducation & Scolaire")
                        : "Démarches & Services"}
                    </span>
                  )}
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-blue-950 mt-2.5">
                    {service.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.features.map((feat, idx) => (
                      <span key={idx} className="text-[10px] bg-blue-50 text-blue-900 font-semibold px-2 py-0.5 rounded-md border border-blue-100">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-wider">Tarif estimé</span>
                  <span className="text-sm font-extrabold text-blue-900">{service.priceEstimate}</span>
                </div>
                <button
                  onClick={() => onQuoteRequest(service.name)}
                  className="px-4 py-2 bg-blue-900 hover:bg-yellow-400 hover:text-blue-950 text-xs font-black text-white rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                >
                  Commander <Icons.ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✨ Highlight Section: Les 3 Piliers CAMUQ & TWINS EMPIRE */}
        <div className="mt-16 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-600 bg-yellow-100/60 px-3.5 py-1.5 rounded-full border border-yellow-200 inline-block">
              Nos Spécialités
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-blue-950">
              Formation, Édition &amp; Imprimerie
            </h3>
            <p className="text-sm text-gray-500">
              Trois expertises complémentaires au service de votre réussite professionnelle et de votre communication visuelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Pilier 1 — Formation */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-xl border border-blue-800/50 p-7 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-bl-full blur-2xl pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center">
                <Icons.GraduationCap className="w-7 h-7 text-yellow-400" />
              </div>
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/15 px-2.5 py-1 rounded-md border border-yellow-400/30 inline-block">
                  CFP C&amp;T-T — Agréé MINEFOP
                </span>
                <h4 className="font-sans font-black text-xl text-white leading-tight">
                  Centre de Formation Professionnelle
                </h4>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Formations Diplômantes (DQP) et Certifiantes (CQP) en Bureautique, Comptabilité, Développement Web, Graphisme, Maintenance Informatique, Marketing Digital et bien plus.
                </p>
              </div>
              <ul className="space-y-1.5 relative z-10">
                {["Secrétariat Bureautique Bilingue", "Comptabilité Informatisée (Sage)", "Développement d'Applications", "Graphisme & Montage Audiovisuel", "Intelligence Artificielle & IA"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-blue-100">
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open("https://wa.me/237675231283?text=" + encodeURIComponent("Bonjour, je souhaite des informations sur vos formations."), "_blank")}
                className="mt-2 w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 relative z-10"
              >
                <Icons.BookOpen className="w-4 h-4" />
                Découvrir les Formations
              </button>
            </div>

            {/* Pilier 2 — Édition */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl border border-slate-700/50 p-7 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-bl-full blur-2xl pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-blue-400/20 border border-blue-400/30 flex items-center justify-center">
                <Icons.BookMarked className="w-7 h-7 text-blue-300" />
              </div>
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 bg-blue-400/15 px-2.5 py-1 rounded-md border border-blue-400/30 inline-block">
                  Maison d&apos;Édition
                </span>
                <h4 className="font-sans font-black text-xl text-white leading-tight">
                  Éditions Littéraires &amp; Pédagogiques
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conception, mise en page professionnelle et publication de livres, manuels scolaires, supports de cours, thèses et rapports de stages. Du manuscrit au produit final.
                </p>
              </div>
              <ul className="space-y-1.5 relative z-10">
                {["Mise en page de livres & manuels", "Correction orthographique & stylistique", "Conception de couvertures", "Impression numérique en petite série", "Dépôt légal & ISBN (accompagnement)"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-200">
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open("https://wa.me/237675231283?text=" + encodeURIComponent("Bonjour, je souhaite des informations sur vos services d'édition."), "_blank")}
                className="mt-2 w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 relative z-10"
              >
                <Icons.BookMarked className="w-4 h-4" />
                Publier Mon Ouvrage
              </button>
            </div>

            {/* Pilier 3 — Imprimerie */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-950 to-yellow-900 text-white shadow-xl border border-yellow-800/50 p-7 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300/10 rounded-bl-full blur-2xl pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-yellow-300/20 border border-yellow-400/30 flex items-center justify-center">
                <Icons.Printer className="w-7 h-7 text-yellow-300" />
              </div>
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-300 bg-yellow-300/15 px-2.5 py-1 rounded-md border border-yellow-400/30 inline-block">
                  Imprimerie Numérique
                </span>
                <h4 className="font-sans font-black text-xl text-white leading-tight">
                  Impression, Flyers &amp; Communication Visuelle
                </h4>
                <p className="text-xs text-yellow-100 leading-relaxed">
                  Impression haute qualité pour tous vos supports de communication professionnels. Du flyer à la bannière grand format, en passant par les t-shirts et roll-ups personnalisés.
                </p>
              </div>
              <ul className="space-y-1.5 relative z-10">
                {["Flyers & affiches (A4 à grand format)", "Roll-ups & banderoles publicitaires", "T-shirts & textiles personnalisés", "Cartes de visite & papeterie pro", "Impression recto-verso & couleurs"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-yellow-100">
                    <Icons.CheckCircle2 className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open("https://wa.me/237675231283?text=" + encodeURIComponent("Bonjour, je souhaite commander une impression ou un support de communication."), "_blank")}
                className="mt-2 w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 relative z-10"
              >
                <Icons.Printer className="w-4 h-4" />
                Commander une Impression
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
