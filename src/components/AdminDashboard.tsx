import React, { useState, useEffect } from "react";
import { 
  Lock, LayoutDashboard, Calendar, Mail, FileText, ShoppingBag, 
  Layers, Users, LogOut, ShieldAlert, Plus, Trash2, Edit2, 
  Check, X, RefreshCw, Eye, Search, AlertCircle, Info, Landmark
} from "lucide-react";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "employee" | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    "stats" | "appointments" | "messages" | "formations" | "services" | "products" | "blog" | "subscribers"
  >("stats");

  // Master local database copy fetched from backend
  const [db, setDb] = useState<any>({
    formations: [],
    services: [],
    products: [],
    blog: [],
    gallery: [],
    appointments: [],
    messages: [],
    testimonials: [],
    subscribers: []
  });

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Create/Edit Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"formation" | "service" | "product" | "blog" | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form Fields
  const [formationForm, setFormationForm] = useState({
    name: "", duration: "1 Mois", level: "Tous niveaux", price: "", icon: "Monitor", description: "", longDescription: "", image: ""
  });
  const [serviceForm, setServiceForm] = useState({
    name: "", category: "secretariat", priceEstimate: "", unit: "unité", baseCost: "", description: "", icon: "Layers"
  });
  const [productForm, setProductForm] = useState({
    name: "", category: "fourniture", price: "", unit: "pièce", image: "", description: "", available: true
  });
  const [blogForm, setBlogForm] = useState({
    title: "", summary: "", content: "", category: "Technologie", image: "", author: "C&T Admin"
  });

  // Fetch DB from server
  const fetchMasterData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/master-data");
      const data = await response.json();
      setDb(data);
    } catch (err) {
      console.error("Error fetching admin master-data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMasterData();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setUserRole(data.user.role);
        setUserName(data.user.name);
      } else {
        setLoginError(data.error || "Identifiants invalides.");
      }
    } catch (err) {
      setLoginError("Erreur réseau ou serveur indisponible.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    setEmail("");
    setPassword("");
  };

  // Generic Status Updater for Appointments / Messages
  const handleUpdateStatus = async (itemType: "appointments" | "messages", id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/${itemType}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        await fetchMasterData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Generic Delete operation
  const handleDeleteItem = async (itemType: "appointments" | "messages" | "formations" | "services" | "products" | "blog", id: string) => {
    if (!window.confirm("Êtes-vous certain de vouloir supprimer cet élément définitivement ?")) return;
    setActionLoading(true);
    try {
      const response = await fetch(`/api/${itemType}/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchMasterData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Submit dynamic creation/editing form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    let payload: any = {};
    let endpoint = "";

    if (modalType === "formation") {
      payload = formationForm;
      endpoint = "formations";
    } else if (modalType === "service") {
      payload = serviceForm;
      endpoint = "services";
    } else if (modalType === "product") {
      payload = productForm;
      endpoint = "products";
    } else if (modalType === "blog") {
      payload = blogForm;
      endpoint = "blog";
    }

    try {
      const method = editingItem ? "PUT" : "POST";
      const finalUrl = editingItem ? `/api/${endpoint}/${editingItem.id}` : `/api/${endpoint}`;

      const response = await fetch(finalUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingItem(null);
        // Clear forms
        resetAllForms();
        await fetchMasterData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const resetAllForms = () => {
    setFormationForm({ name: "", duration: "1 Mois", level: "Tous niveaux", price: "", icon: "Monitor", description: "", longDescription: "", image: "" });
    setServiceForm({ name: "", category: "secretariat", priceEstimate: "", unit: "unité", baseCost: "", description: "", icon: "Layers" });
    setProductForm({ name: "", category: "fourniture", price: "", unit: "pièce", image: "", description: "", available: true });
    setBlogForm({ title: "", summary: "", content: "", category: "Technologie", image: "", author: "C&T Admin" });
  };

  const handleOpenEdit = (type: "formation" | "service" | "product" | "blog", item: any) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);

    if (type === "formation") {
      setFormationForm({
        name: item.name, duration: item.duration, level: item.level, price: item.price.toString(),
        icon: item.icon, description: item.description, longDescription: item.longDescription || "", image: item.image
      });
    } else if (type === "service") {
      setServiceForm({
        name: item.name, category: item.category, priceEstimate: item.priceEstimate, unit: item.unit,
        baseCost: item.baseCost.toString(), description: item.description, icon: item.icon
      });
    } else if (type === "product") {
      setProductForm({
        name: productForm.name, category: item.category, price: item.price.toString(), unit: item.unit,
        image: item.image, description: item.description, available: item.available
      });
    } else if (type === "blog") {
      setBlogForm({
        title: item.title, summary: item.summary, content: item.content, category: item.category,
        image: item.image, author: item.author
      });
    }
  };

  const handleOpenCreate = (type: "formation" | "service" | "product" | "blog") => {
    setModalType(type);
    setEditingItem(null);
    resetAllForms();
    setIsModalOpen(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center animate-fade-in px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-150 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-50 text-blue-900 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-sans font-black text-2xl text-blue-950 tracking-tight">Espace d&apos;Administration</h2>
            <p className="text-xs text-gray-500">Réservé uniquement aux employés et dirigeants de C&T Empire Ltd.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-800 border border-red-150 rounded-xl flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Adresse email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@empire.com"
                className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-900 focus:bg-white rounded-xl text-sm outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mot de passe</label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-900 focus:bg-white rounded-xl text-sm outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow cursor-pointer"
            >
              Se connecter
            </button>
          </form>

          <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100 space-y-1">
            <h4 className="text-xs font-black text-yellow-800 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Comptes de Démonstration :
            </h4>
            <p className="text-[10px] text-yellow-700 leading-relaxed">
              - Administrateur: <strong className="text-yellow-950">admin@empire.com</strong> / Mot de passe : <strong className="text-yellow-950">admin</strong><br />
              - Employé: <strong className="text-yellow-950">employee@empire.com</strong> / Mot de passe : <strong className="text-yellow-950">employee</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-slate-50 min-h-screen animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-blue-950 shadow-md">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-yellow-400 flex items-center justify-center shrink-0 border border-white/10 backdrop-blur">
              <Landmark className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="font-sans font-black text-xl sm:text-2xl leading-none">C&T EMPIRE</h2>
                <span className="text-[10px] bg-yellow-400 text-blue-950 px-2 py-0.5 rounded-full font-black uppercase">
                  {userRole === "admin" ? "Super Admin" : "Employé"}
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1">Connecté en tant que {userName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMasterData}
              disabled={loading}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
              title="Actualiser la base"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Dashboard Columns (Sidebar Menu + Panel display) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Menu Sidebar (Col span 3) */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "stats", label: "Statistiques Générales", icon: LayoutDashboard },
              { id: "appointments", label: "Prises de RDV", icon: Calendar, badge: db.appointments.length },
              { id: "messages", label: "Messages directes", icon: Mail, badge: db.messages.filter((m: any) => m.status === "Non lu").length },
              { id: "formations", label: "Gérer Formations", icon: FileText },
              { id: "services", label: "Gérer Services", icon: Layers },
              { id: "products", label: "Boutique & Produits", icon: ShoppingBag },
              { id: "blog", label: "Mag & Articles", icon: Info },
              { id: "subscribers", label: "Abonnés Newsletter", icon: Users }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSearchTerm("");
                  }}
                  className={`w-full p-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-900 text-white shadow"
                      : "bg-white text-gray-500 hover:bg-slate-100 hover:text-blue-950 border border-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <TabIcon className="w-4 h-4" />
                    {tab.label}
                  </span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Core Panel displaying active selected module (Col span 9) */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-sm min-h-[400px]">
            
            {/* STATS PANEL VIEW */}
            {activeTab === "stats" && (
              <div className="space-y-6">
                <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight border-b border-gray-100 pb-3">
                  Tableau de Bord C&T Empire
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">RDV Planifiés</span>
                    <span className="text-2xl font-black text-blue-900">{db.appointments.length}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Messages reçus</span>
                    <span className="text-2xl font-black text-blue-900">{db.messages.length}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Formations actives</span>
                    <span className="text-2xl font-black text-blue-900">{db.formations.length}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Abonnés</span>
                    <span className="text-2xl font-black text-blue-900">{db.subscribers.length}</span>
                  </div>
                </div>

                <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-950 relative overflow-hidden space-y-4 mt-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-10"></div>
                  <h4 className="font-sans font-black text-lg text-yellow-400">Empire AI Integration Actif</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Toutes les conversations avec vos visiteurs via le Chatbot interactif officiel se basent sur l&apos;API de Gemini pour analyser, proposer des formations et orienter l&apos;utilisateur de manière optimale vers vos formulaires ou numéros de téléphone officiels.
                  </p>
                </div>
              </div>
            )}

            {/* APPOINTMENTS VIEW */}
            {activeTab === "appointments" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">Suivi des Rendez-vous</h3>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-gray-500">{db.appointments.length} Total</span>
                </div>

                <div className="space-y-4">
                  {db.appointments.map((apt: any) => (
                    <div key={apt.id} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                      <div className="space-y-1.5">
                        <div className="flex gap-2 items-center flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-blue-900 text-white px-2.5 py-0.5 rounded-full">
                            {apt.id}
                          </span>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            apt.status === "Confirmé" ? "bg-emerald-100 text-emerald-800" : apt.status === "Annulé" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                        <h4 className="font-sans font-black text-base text-blue-950">{apt.clientName}</h4>
                        <p className="text-xs text-gray-500">
                          📞 {apt.clientPhone} | ✉️ {apt.clientEmail}
                        </p>
                        <p className="text-xs font-semibold text-blue-900 bg-blue-50/80 py-1 px-2.5 rounded-lg inline-block">
                          🎯 {apt.serviceType}
                        </p>
                        <p className="text-xs text-gray-500 font-bold">
                          📅 {apt.date} à {apt.time} (Heure locale)
                        </p>
                        {apt.notes && <p className="text-[11px] text-gray-400 italic">Notes: &ldquo;{apt.notes}&rdquo;</p>}
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleUpdateStatus("appointments", apt.id, "Confirmé")}
                          className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100/60"
                          title="Confirmer"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUpdateStatus("appointments", apt.id, "Annulé")}
                          className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 transition-colors border border-yellow-100/60"
                          title="Annuler"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("appointments", apt.id)}
                          className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100/60"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT MESSAGES VIEW */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">Messages Directes</h3>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-gray-500">{db.messages.length} messages</span>
                </div>

                <div className="space-y-4">
                  {db.messages.map((msg: any) => (
                    <div key={msg.id} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            msg.status === "Non lu" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {msg.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-sans font-black text-base text-blue-950">Sujet: {msg.subject}</h4>
                        <p className="text-xs text-gray-500 font-semibold">Par : {msg.name} (✉️ {msg.email} | 📞 {msg.phone || 'Non spécifié'})</p>
                        <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs text-gray-600 leading-relaxed">
                          {msg.message}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleUpdateStatus("messages", msg.id, "Lu")}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-emerald-100 transition-colors border border-emerald-100"
                        >
                          Marquer Lu
                        </button>
                        <button
                          onClick={() => handleDeleteItem("messages", msg.id)}
                          className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORMATIONS MANAGEMENT VIEW */}
            {activeTab === "formations" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">Gestion des formations</h3>
                  <button
                    onClick={() => handleOpenCreate("formation")}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Créer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {db.formations.map((f: any) => (
                    <div key={f.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-base text-blue-950">{f.name}</h4>
                        <div className="flex gap-2 text-[10px] font-bold">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{f.level}</span>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">{f.duration}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{f.description}</p>
                        <p className="text-xs font-black text-yellow-600">{f.price.toLocaleString()} FCFA</p>
                      </div>

                      <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 mt-4">
                        <button
                          onClick={() => handleOpenEdit("formation", f)}
                          className="p-1.5 rounded-lg hover:bg-slate-200 text-gray-500 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("formations", f.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES VIEW */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">Gestion des Services</h3>
                  <button
                    onClick={() => handleOpenCreate("service")}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                </div>

                <div className="space-y-2">
                  {db.services.map((s: any) => (
                    <div key={s.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-sm text-blue-950">{s.name}</h4>
                        <p className="text-xs text-gray-400 capitalize">{s.category} | {s.priceEstimate}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEdit("service", s)}
                          className="p-1 text-gray-400 hover:text-blue-950"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("services", s.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCTS VIEW */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">Gestion Boutique</h3>
                  <button
                    onClick={() => handleOpenCreate("product")}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Créer Produit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {db.products.map((p: any) => (
                    <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-blue-950">{p.name}</h4>
                        <p className="text-xs text-yellow-600 font-bold">{p.price.toLocaleString()} FCFA / {p.unit}</p>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${p.available ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                          {p.available ? 'Disponible' : 'Rupture'}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEdit("product", p)}
                          className="p-1.5 rounded-lg hover:bg-slate-200 text-gray-500 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("products", p.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOG POSTS VIEW */}
            {activeTab === "blog" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">Gestion Blog & Guides</h3>
                  <button
                    onClick={() => handleOpenCreate("blog")}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Nouvel Article
                  </button>
                </div>

                <div className="space-y-2">
                  {db.blog.map((b: any) => (
                    <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-sm text-blue-950 leading-tight">{b.title}</h4>
                        <p className="text-[10px] text-gray-400">{b.category} | {b.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEdit("blog", b)}
                          className="p-1.5 text-gray-400 hover:text-blue-950"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("blog", b.id)}
                          className="p-1.5 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBSCRIBERS VIEW */}
            {activeTab === "subscribers" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">Abonnés à la Newsletter</h3>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-gray-500 leading-relaxed">
                  Consultez la liste des adresses email enregistrées pour vos futures campagnes d&apos;emailing et annonces.
                </div>

                <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100 shadow-sm text-sm">
                  {db.subscribers.map((email: string, idx: number) => (
                    <div key={idx} className="p-4 bg-white hover:bg-slate-50 flex items-center justify-between">
                      <span className="font-semibold text-blue-950">{email}</span>
                      <span className="text-[10px] uppercase font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        Actif
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* COMPREHENSIVE CREATE / EDIT MODAL SCREEN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl border border-gray-150 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-sans font-black text-xl text-blue-950 mb-6">
              {editingItem ? "Modifier" : "Ajouter"} - {modalType === "formation" ? "Formation" : modalType === "service" ? "Service" : modalType === "product" ? "Produit" : "Article"}
            </h3>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              
              {/* Formation Fields */}
              {modalType === "formation" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Titre de la formation *</label>
                    <input 
                      type="text" required value={formationForm.name} 
                      onChange={(e) => setFormationForm({ ...formationForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Durée *</label>
                      <input 
                        type="text" required value={formationForm.duration} 
                        onChange={(e) => setFormationForm({ ...formationForm, duration: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Prix (FCFA) *</label>
                      <input 
                        type="number" required value={formationForm.price} 
                        onChange={(e) => setFormationForm({ ...formationForm, price: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Image URL (Unsplash)</label>
                    <input 
                      type="text" value={formationForm.image} 
                      onChange={(e) => setFormationForm({ ...formationForm, image: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Description courte *</label>
                    <textarea 
                      required rows={3} value={formationForm.description} 
                      onChange={(e) => setFormationForm({ ...formationForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Service Fields */}
              {modalType === "service" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Nom du Service *</label>
                    <input 
                      type="text" required value={serviceForm.name} 
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Catégorie *</label>
                      <select 
                        value={serviceForm.category} 
                        onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none"
                      >
                        <option value="secretariat">Secrétariat</option>
                        <option value="imprimerie">Imprimerie</option>
                        <option value="autres">Autres / Cyber</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Estimation tarifaire (Ex: 100 FCFA/page) *</label>
                      <input 
                        type="text" required value={serviceForm.priceEstimate} 
                        onChange={(e) => setServiceForm({ ...serviceForm, priceEstimate: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Description *</label>
                    <textarea 
                      required rows={3} value={serviceForm.description} 
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Product Fields */}
              {modalType === "product" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Nom de l&apos;Article *</label>
                    <input 
                      type="text" required value={productForm.name} 
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Catégorie *</label>
                      <select 
                        value={productForm.category} 
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none"
                      >
                        <option value="fourniture">Fourniture de Bureau</option>
                        <option value="longrich">Produit de Santé Longrich</option>
                        <option value="bijoux">Bijoux & Accessoires</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase">Prix (FCFA) *</label>
                      <input 
                        type="number" required value={productForm.price} 
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Description *</label>
                    <textarea 
                      required rows={3} value={productForm.description} 
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Blog Fields */}
              {modalType === "blog" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Titre de l&apos;article *</label>
                    <input 
                      type="text" required value={blogForm.title} 
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Résumé court *</label>
                    <input 
                      type="text" required value={blogForm.summary} 
                      onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Contenu complet de l&apos;article *</label>
                    <textarea 
                      required rows={6} value={blogForm.content} 
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-gray-150 outline-none" 
                    ></textarea>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow"
              >
                {actionLoading ? "Traitement..." : "Enregistrer"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
