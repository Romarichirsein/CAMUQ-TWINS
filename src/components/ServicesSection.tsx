import React, { useState } from "react";
import * as Icons from "lucide-react";
import { 
  SERVICES_DATA, 
  FORMATIONS_DATA, 
  PRODUCT_DATA 
} from "../data";

interface ServicesSectionProps {
  onNavigateToEstimator: (serviceName?: string) => void;
  onNavigateToTraining: (trainingName: string) => void;
}

export default function ServicesSection({ onNavigateToEstimator, onNavigateToTraining }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<"services" | "formations" | "autres" | "commerce">("services");

  // Dynamic icon renderer helper
  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  // Filter lists from unified DB structure
  const secretariatServices = SERVICES_DATA.filter(s => s.category === "secretariat");
  const imprimerieServices = SERVICES_DATA.filter(s => s.category === "imprimerie");
  const autresServices = SERVICES_DATA.filter(s => s.category === "autres");
  const commerceProducts = PRODUCT_DATA;

  return (
    <section id="services-section" className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Découvrez Notre Univers Multidirectionnel
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            De la papeterie bureautique bilingue à l&apos;imprimerie de pointe, en passant par les services financiers mobiles et des formations professionnelles certifiées. Choisissez une catégorie pour en savoir plus.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-gray-50 rounded-2xl max-w-2xl mx-auto border border-gray-100">
          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              activeTab === "services"
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                : "text-gray-500 hover:text-blue-950 hover:bg-white"
            }`}
          >
            <Icons.Printer className="w-4 h-4 shrink-0" />
            Bureautique & Imprimerie
          </button>
          
          <button
            onClick={() => setActiveTab("formations")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              activeTab === "formations"
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                : "text-gray-500 hover:text-blue-950 hover:bg-white"
            }`}
          >
            <Icons.BookOpen className="w-4 h-4 shrink-0" />
            Nos Formations
          </button>

          <button
            onClick={() => setActiveTab("autres")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              activeTab === "autres"
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                : "text-gray-500 hover:text-blue-950 hover:bg-white"
            }`}
          >
            <Icons.Layers className="w-4 h-4 shrink-0" />
            Autres Services
          </button>

          <button
            onClick={() => setActiveTab("commerce")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              activeTab === "commerce"
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                : "text-gray-500 hover:text-blue-950 hover:bg-white"
            }`}
          >
            <Icons.ShoppingBag className="w-4 h-4 shrink-0" />
            Commerce & Boutique
          </button>
        </div>

        {/* Tab Contents */}
        <div id="tab-content" className="min-h-[400px]">
          
          {/* CATEGORY 1: BUREAUTIQUE & IMPRIMERIE */}
          {activeTab === "services" && (
            <div className="space-y-12 animate-fade-in">
              {/* Secrétariat Row */}
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h3 className="font-sans font-black text-2xl text-blue-950 tracking-tight">
                    Secrétariat Bureautique Bilingue
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Conception, mise en page, correction et tirage de vos documents clés.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secretariatServices.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100/60 group-hover:bg-blue-200/50 text-blue-900 flex items-center justify-center transition-colors">
                          {renderIcon(item.icon || "FileText", "w-5 h-5")}
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-blue-950 group-hover:text-blue-900 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Tarif indicatif</span>
                          <span className="text-xs sm:text-sm font-extrabold text-yellow-600 block">{item.priceEstimate}</span>
                        </div>
                        <button
                          onClick={() => onNavigateToEstimator(item.name)}
                          className="px-3 py-1.5 text-xs font-bold text-blue-900 bg-white hover:bg-blue-900 hover:text-white rounded-lg border border-blue-200 transition-all cursor-pointer flex items-center gap-1"
                        >
                          Commander <Icons.ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Imprimerie Row */}
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h3 className="font-sans font-black text-2xl text-blue-950 tracking-tight">
                    Imprimerie Numérique & Flyers
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Soutiens de salons, roll-ups, t-shirts personnalisés et banderoles grand format.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imprimerieServices.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100/60 group-hover:bg-blue-200/50 text-blue-900 flex items-center justify-center transition-colors">
                          {renderIcon(item.icon || "Layers", "w-5 h-5")}
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-blue-950 group-hover:text-blue-900 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Tarif indicatif</span>
                          <span className="text-xs sm:text-sm font-extrabold text-yellow-600 block">{item.priceEstimate}</span>
                        </div>
                        <button
                          onClick={() => onNavigateToEstimator(item.name)}
                          className="px-3 py-1.5 text-xs font-bold text-blue-900 bg-white hover:bg-blue-900 hover:text-white rounded-lg border border-blue-200 transition-all cursor-pointer flex items-center gap-1"
                        >
                          Commander <Icons.ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 2: FORMATIONS */}
          {activeTab === "formations" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-l-4 border-yellow-400 pl-4 mb-8">
                <h3 className="font-sans font-black text-2xl text-blue-950 tracking-tight">
                  Nos Formations Professionnelles Certifiantes
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Développez des compétences de pointe directement applicables sur le marché de l&apos;emploi national et international.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {FORMATIONS_DATA.map((form) => (
                  <div 
                    key={form.id}
                    className="rounded-2xl border border-gray-150/70 bg-white hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="p-5 space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100">
                        {renderIcon(form.icon, "w-6 h-6")}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] bg-blue-50 text-blue-900 font-bold px-2 py-0.5 rounded-full border border-blue-100">
                          Durée : {form.duration}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-blue-950 pt-1.5 leading-snug">
                          {form.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {form.description}
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 border-t border-slate-100/60 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-wider">Coût formation</span>
                        <span className="text-base font-black text-blue-950">{form.price.toLocaleString()} <span className="text-xs font-bold text-gray-400">FCFA</span></span>
                      </div>
                      <button
                        onClick={() => onNavigateToTraining(form.name)}
                        className="px-3.5 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                      >
                        S&apos;inscrire <Icons.UserPlus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY 3: AUTRES SERVICES */}
          {activeTab === "autres" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-l-4 border-yellow-400 pl-4 mb-8">
                <h3 className="font-sans font-black text-2xl text-blue-950 tracking-tight">
                  Services en Ligne, Financiers & Administratifs
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Profitez de nos solutions simplifiées de paiement, de transferts d&apos;argent et de démarches administratives à un seul endroit.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {autresServices.map((srv) => (
                  <div 
                    key={srv.id}
                    className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 border border-blue-100/50">
                      {renderIcon(srv.icon || "Layers", "w-6 h-6")}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-base text-blue-950">
                        {srv.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY 4: COMMERCE & BOUTIQUE */}
          {activeTab === "commerce" && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-l-4 border-yellow-400 pl-4 mb-8">
                <h3 className="font-sans font-black text-2xl text-blue-950 tracking-tight">
                  Espace Commerce, Articles de Santé & Bijoux Chic
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Découvrez nos fournitures de bureau Premium, articles de santé certifiés Longrich ou nos parures élégantes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {commerceProducts.slice(0, 3).map((prod) => (
                  <div 
                    key={prod.id}
                    className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="h-40 rounded-xl overflow-hidden bg-slate-100">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-base text-blue-950">
                        {prod.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-black text-yellow-600">{prod.price.toLocaleString()} FCFA</span>
                      <button
                        onClick={() => onNavigateToEstimator(prod.name)}
                        className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        Acheter <Icons.ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
