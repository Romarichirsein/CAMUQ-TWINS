import React, { useState } from "react";
import { Search, SlidersHorizontal, AlertCircle, MessageCircle } from "lucide-react";
import { PRODUCT_DATA } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface ProductsPageProps {
  onOrderProduct: (productName: string) => void;
}

const WHATSAPP_NUMBER = "237675231283";

export default function ProductsPage({ onOrderProduct }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { t } = useLanguage();
  const prodT = t.products;

  const categories = [
    { id: "all", label: prodT.allCat },
    { id: "fourniture", label: prodT.fournitureCat },
    { id: "papeterie", label: prodT.papeterieCat },
    { id: "longrich", label: prodT.longrichCat },
    { id: "bijoux", label: prodT.bijouxCat }
  ];

  const filteredProducts = PRODUCT_DATA.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppOrder = (productName: string) => {
    const message = encodeURIComponent(
      `Bonjour CAMUQ & TWINS EMPIRE ! 👋\n\nJe souhaite commander le produit suivant :\n\n🛒 *${productName}*\n\nMerci de me donner les informations sur la disponibilité et le prix.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div id="products-view" className="py-16 bg-slate-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Title & Search Bar */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-600 bg-yellow-100/60 px-3.5 py-1.5 rounded-full border border-yellow-200">
            {prodT.pageTag}
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            {prodT.pageTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
            {prodT.pageSubtitle}
          </p>

          {/* Search input bar */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={prodT.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-800 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
            />
          </div>
        </div>

        {/* Category Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-blue-900 text-white shadow-sm"
                  : "bg-white text-gray-500 hover:bg-slate-100 hover:text-blue-900 border border-gray-150"
              }`}
            >
              {cat.id === "all" && <SlidersHorizontal className="w-3.5 h-3.5" />}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Product Photo */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.available && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <span className="bg-red-500 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                        Rupture temporaire
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-extrabold uppercase bg-blue-900 text-white px-2.5 py-1 rounded-full shadow-sm tracking-wider">
                      {product.category === "fourniture" || product.category === "papeterie"
                        ? "Papeterie Bilingue"
                        : product.category === "longrich"
                        ? "Longrich"
                        : "Bijoux"}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 flex flex-col gap-4 flex-grow">
                  <div className="space-y-1.5 flex-grow">
                    <h3 className="font-sans font-bold text-base sm:text-lg text-blue-950 group-hover:text-blue-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* WhatsApp Order Button */}
                  <button
                    onClick={() => handleWhatsAppOrder(product.name)}
                    disabled={!product.available}
                    className={`w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-sm ${
                      product.available
                        ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-lg hover:shadow-green-500/25 active:scale-95 cursor-pointer"
                        : "bg-slate-100 text-gray-300 cursor-not-allowed"
                    }`}
                    title="Commander via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Commander via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-3 max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto" />
            <h4 className="font-bold text-lg text-blue-950">Aucun produit trouvé</h4>
            <p className="text-xs text-gray-500">
              Essayez de modifier vos filtres ou de vider la barre de recherche pour découvrir
              l&apos;intégralité de nos fournitures de bureau, bijoux d&apos;exception et produits Longrich.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
