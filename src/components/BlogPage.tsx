import React, { useState } from "react";
import { Calendar, User, Eye, ArrowLeft, Search, Bookmark } from "lucide-react";
import { BLOG_DATA } from "../data";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_DATA[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "Technologie", "Démarches", "Marketing"];

  const filteredPosts = BLOG_DATA.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog-view" className="py-16 bg-slate-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* If a detailed post is selected, show single post reader layout */}
        {selectedPost ? (
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-gray-150 shadow-md">
            {/* Back button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-950 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Retour à tous les articles
            </button>

            {/* Main Picture */}
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-150">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="text-xs bg-yellow-400 text-blue-950 font-black px-3.5 py-1.5 rounded-xl uppercase tracking-widest border border-yellow-350">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-semibold border-y border-gray-100 py-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-900" />
                {selectedPost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-900" />
                Par {selectedPost.author}
              </span>
              <span className="flex items-center gap-1.5 ml-auto">
                <Eye className="w-4 h-4 text-blue-900" />
                {selectedPost.views + 12} vues
              </span>
            </div>

            {/* Post Title */}
            <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-blue-950 tracking-tight leading-tight">
              {selectedPost.title}
            </h2>

            {/* Content markup container */}
            <div className="text-gray-700 space-y-6 leading-relaxed text-sm sm:text-base">
              <p className="font-semibold text-gray-900 text-base sm:text-lg border-l-4 border-yellow-400 pl-4">
                {selectedPost.summary}
              </p>
              <div className="whitespace-pre-line space-y-4 pt-2">
                {selectedPost.content}
              </div>
              <p className="pt-4 text-xs text-gray-400 italic">
                Avertissement de publication : Les avis exprimés dans cette section visent à guider et orienter notre clientèle d&apos;étudiants et d&apos;entreprises dans leurs choix opérationnels au quotidien.
              </p>
            </div>
          </div>
        ) : (
          /* OTHERWISE show Grid index layout */
          <div className="space-y-12">
            
            {/* Index Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-yellow-600 bg-yellow-100/60 px-3 py-1.5 rounded-full border border-yellow-200">
                Le Mag C&T Empire
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
                Actualités, Conseils Pro & Guides Pratiques
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Retrouvez les éclairages de nos experts sur la révolution numérique, la rédaction de documents bilingues de premier ordre et les astuces administratives camerounaises.
              </p>
            </div>

            {/* Filter / Search Bar */}
            <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Rechercher un conseil ou un guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl text-sm border-0 focus:ring-2 focus:ring-blue-900 focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? "bg-blue-900 text-white shadow-sm"
                        : "bg-slate-50 text-gray-500 hover:bg-slate-100 hover:text-blue-900"
                    }`}
                  >
                    {cat === "all" ? "Toutes les catégories" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Post cards grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-150 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Thumbnail */}
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="text-[10px] bg-blue-900 text-white font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Snippet Details */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                        </div>
                        <h3 className="font-sans font-black text-base sm:text-lg text-blue-950 group-hover:text-blue-900 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-gray-100/60 mt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-900 group-hover:underline">
                        Lire l&apos;article complet
                      </span>
                      <Bookmark className="w-4 h-4 text-gray-300 group-hover:text-yellow-500 transition-colors" />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 max-w-md mx-auto space-y-2">
                <p className="text-sm text-gray-500 font-semibold">Aucun article ne correspond à vos critères de filtrage.</p>
                <p className="text-xs text-gray-400">Essayez de saisir un autre mot clé ou de choisir &ldquo;Toutes les catégories&rdquo;.</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
