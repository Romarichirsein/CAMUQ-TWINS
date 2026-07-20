import React, { useState } from "react";
import { Plus, Minus, Search, HelpCircle, AlertCircle } from "lucide-react";
import { FAQ_DATA } from "../data";

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQ_DATA.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="faq-view" className="py-16 bg-white animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Foire Aux Questions C&T
          </span>
          <h2 className="font-sans font-black text-3xl text-blue-950 tracking-tight">
            Des Réponses Claires à Vos Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Vous avez des questions sur nos formations professionnelles certifiées, nos tarifs de secrétariat bilingue, d&apos;imprimerie ou nos démarches en ligne ? Consultez notre foire aux questions.
          </p>
        </div>

        {/* Quick Search bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Rechercher une question ou un thème précis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl text-sm border-0 focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all"
          />
        </div>

        {/* Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? "border-blue-150 bg-blue-50/20 shadow-md" 
                      : "border-gray-100 bg-slate-50/40 hover:bg-slate-50"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-sans font-bold text-sm sm:text-base text-blue-950 hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-5 h-5 text-blue-900 shrink-0" />
                      {faq.question}
                    </span>
                    <span className="p-1.5 rounded-lg bg-white shadow-sm border border-gray-150 text-blue-900 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {/* Animated Collapse Wrapper */}
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/50 pt-4 animate-slide-down">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 max-w-sm mx-auto space-y-2">
            <AlertCircle className="w-10 h-10 text-yellow-500 mx-auto" />
            <h4 className="font-bold text-sm text-blue-950">Aucun résultat trouvé</h4>
            <p className="text-xs text-gray-400">Essayez de saisir un autre mot-clé pour interroger notre FAQ.</p>
          </div>
        )}

      </div>
    </div>
  );
}
