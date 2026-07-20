import React, { useState } from "react";
import { Search, ShoppingCart, Check, SlidersHorizontal, AlertCircle } from "lucide-react";
import { PRODUCT_DATA } from "../data";

interface ProductsPageProps {
  onOrderProduct: (productName: string) => void;
}

export default function ProductsPage({ onOrderProduct }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [successOrder, setSuccessOrder] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "Tout le Catalogue" },
    { id: "fourniture", label: "Fournitures de Bureau" },
    { id: "longrich", label: "Produits de Santé Longrich" },
    { id: "bijoux", label: "Bijoux & Accessoires" }
  ];

  const filteredProducts = PRODUCT_DATA.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickOrder = (prodName: string) => {
    onOrderProduct(prodName);
    setSuccessOrder(prodName);
    setTimeout(() => {
      setSuccessOrder(null);
    }, 4000);
  };

  return (
    <div id="products-view" className="py-16 bg-slate-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-600 bg-yellow-100/60 px-3 py-1.5 rounded-full border border-yellow-200">
            Catalogue de Vente C&T
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Notre Boutique & Articles Exclusivement Sélectionnés
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Trouvez vos fournitures scolaires, équipez vos bureaux, prenez soin de votre corps avec les produits Longrich d&apos;origine naturelle, ou offrez-vous des bijoux raffinés.
          </p>
        </div>

        {/* Search and Filters panel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Rechercher un article (cahier, Longrich, bijoux...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl text-sm border-0 focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all"
              />
            </div>

            {/* Category Selectors */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-blue-900 text-white shadow-sm"
                      : "bg-slate-50 text-gray-500 hover:bg-slate-100 hover:text-blue-900"
                  }`}
                >
                  {cat.id === "all" && <SlidersHorizontal className="w-3.5 h-3.5" />}
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Success Alert Banner */}
        {successOrder && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-150 p-4 rounded-2xl flex items-center gap-3 max-w-3xl mx-auto animate-bounce">
            <Check className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs sm:text-sm font-semibold">
              Votre demande d&apos;achat pour &ldquo;<strong className="text-emerald-950">{successOrder}</strong>&rdquo; a été pré-remplie ! Veuillez finaliser le formulaire de contact ci-dessous pour valider la livraison.
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-150 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Photo space */}
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
                      {product.category === "fourniture" ? "Bureau" : product.category === "longrich" ? "Longrich" : "Bijoux"}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-sans font-bold text-base sm:text-lg text-blue-950 group-hover:text-blue-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-wider">Prix / {product.unit}</span>
                      <span className="text-base font-black text-yellow-600">{product.price.toLocaleString()} FCFA</span>
                    </div>
                    <button
                      onClick={() => handleQuickOrder(product.name)}
                      disabled={!product.available}
                      className={`p-3 rounded-xl transition-all cursor-pointer ${
                        product.available 
                          ? "bg-blue-900 hover:bg-blue-950 text-white shadow-sm hover:shadow-md"
                          : "bg-slate-100 text-gray-300 cursor-not-allowed"
                      }`}
                      title="Passer commande"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-3 max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto" />
            <h4 className="font-bold text-lg text-blue-950">Aucun produit trouvé</h4>
            <p className="text-xs text-gray-500">
              Essayez de modifier vos filtres ou de vider la barre de recherche pour découvrir l&apos;intégralité de nos fournitures de bureau, bijoux d&apos;exception et produits Longrich.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
