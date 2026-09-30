import React, { useState, useMemo } from "react";
import {
  Download,
  FileText,
  ExternalLink,
  Award,
  Calendar,
  Clock,
  Sparkles,
  Search,
  ArrowRight,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Percent,
  CheckCircle2,
  FolderCheck,
  MessageSquare,
  Building2,
  ChevronRight,
  Filter
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PricingDownloadSectionProps {
  onNavigate: (section: string, subCategoryOrSubject?: string) => void;
  onRegisterTraining?: (trainingName: string) => void;
}

interface FormationTarif {
  code: string;
  name: string;
  enName: string;
  type: "DQP" | "CQP" | "AQP";
  category: "tic-gestion" | "langues";
  levelRequired: string;
  pension: string;
  pensionNumeric: number;
  duration: string;
  equipment: string;
  popular?: boolean;
}

const FORMATIONS_TARIFF_DATA: FormationTarif[] = [
  // --- FORMATIONS DIPLÔMANTES DQP (9 + 3 mois) ---
  {
    code: "SB",
    name: "Secrétariat Bureautique",
    enName: "Office Automation Secretaryship",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "3e / BEPC - CAP - O'L",
    pension: "300 000 FCFA",
    pensionNumeric: 300000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },
  {
    code: "SBB",
    name: "Secrétariat Bureautique Bilingue",
    enName: "Bilingual Secretaryship",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "Tle - Upper Sixth",
    pension: "350 000 FCFA",
    pensionNumeric: 350000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires",
    popular: true
  },
  {
    code: "SC",
    name: "Secrétariat Comptable",
    enName: "Accounting Secretaryship",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "1ère - Lower Sixth",
    pension: "350 000 FCFA",
    pensionNumeric: 350000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },
  {
    code: "SD",
    name: "Secrétariat de Direction",
    enName: "Executive Secretaryship",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "BAC - A Level",
    pension: "350 000 FCFA",
    pensionNumeric: 350000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },
  {
    code: "CIG",
    name: "Comptabilité Informatisée et Gestion",
    enName: "Computerized Account. & Management",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "Tle - Upper Sixth",
    pension: "350 000 FCFA",
    pensionNumeric: 350000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires",
    popular: true
  },
  {
    code: "MI",
    name: "Maintenance Informatique",
    enName: "Computer Hardware Maintenance",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "1ère - Lower Sixth",
    pension: "400 000 FCFA",
    pensionNumeric: 400000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + matériels nécessaires"
  },
  {
    code: "MRI",
    name: "Maintenance des Réseaux Informatiques",
    enName: "Computer Network Maintenance",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "Tle Sc. - Upper Sixth Sc.",
    pension: "450 000 FCFA",
    pensionNumeric: 450000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + matériels nécessaires"
  },
  {
    code: "DA",
    name: "Développement d'Application",
    enName: "Application Development",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "BAC Scient. - A Level Sc.",
    pension: "450 000 FCFA",
    pensionNumeric: 450000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires",
    popular: true
  },
  {
    code: "GP",
    name: "Graphisme de Production",
    enName: "Graphic Design Production",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "Tle - Upper Sixth",
    pension: "400 000 FCFA",
    pensionNumeric: 400000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },
  {
    code: "MOAV",
    name: "Montage Audiovisuel",
    enName: "Audiovisual Editing & Production",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "3e / BEPC - CAP - O'L",
    pension: "400 000 FCFA",
    pensionNumeric: 400000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },
  {
    code: "WM",
    name: "Webmestre",
    enName: "Webmaster & Web Management",
    type: "DQP",
    category: "tic-gestion",
    levelRequired: "BAC - A Level",
    pension: "400 000 FCFA",
    pensionNumeric: 400000,
    duration: "9 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },

  // --- FORMATIONS CERTIFIANTES CQP (3 + 3 mois) ---
  {
    code: "MD",
    name: "Marketing Digital",
    enName: "Digital Marketing & Social Media",
    type: "CQP",
    category: "tic-gestion",
    levelRequired: "3e / BEPC - CAP - O'L",
    pension: "200 000 FCFA",
    pensionNumeric: 200000,
    duration: "3 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires",
    popular: true
  },
  {
    code: "SI",
    name: "Sécurité Informatique",
    enName: "Cybersecurity & Information Security",
    type: "CQP",
    category: "tic-gestion",
    levelRequired: "BAC Scient. - A Level Sc.",
    pension: "250 000 FCFA",
    pensionNumeric: 250000,
    duration: "3 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },
  {
    code: "MVCC",
    name: "Montage de Visuels et Création de Contenus",
    enName: "Visual & Content Creation",
    type: "CQP",
    category: "tic-gestion",
    levelRequired: "3e / BEPC - CAP - O'L",
    pension: "200 000 FCFA",
    pensionNumeric: 200000,
    duration: "3 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires"
  },
  {
    code: "IA",
    name: "Intelligence Artificielle",
    enName: "Artificial Intelligence Applied",
    type: "CQP",
    category: "tic-gestion",
    levelRequired: "BAC Scient. - A Level Sc.",
    pension: "250 000 FCFA",
    pensionNumeric: 250000,
    duration: "3 + 3 mois de stage",
    equipment: "Ordinateur + fournitures nécessaires",
    popular: true
  },

  // --- CERTIFICATS DE LANGUES INTERNATIONALES AQP (2 mois) ---
  {
    code: "LCH",
    name: "Langue Chinoise (Mandarin)",
    enName: "Chinese Language (Mandarin)",
    type: "AQP",
    category: "langues",
    levelRequired: "Tout niveau",
    pension: "150 000 FCFA",
    pensionNumeric: 150000,
    duration: "2 mois accélérés",
    equipment: "Support de cours offert",
    popular: true
  },
  {
    code: "LAN",
    name: "Langue Anglaise",
    enName: "English Language Business & General",
    type: "AQP",
    category: "langues",
    levelRequired: "Tout niveau",
    pension: "130 000 FCFA",
    pensionNumeric: 130000,
    duration: "2 mois accélérés",
    equipment: "Support de cours offert"
  },
  {
    code: "LFR",
    name: "Langue Française",
    enName: "French Language & Business Writing",
    type: "AQP",
    category: "langues",
    levelRequired: "Tout niveau",
    pension: "130 000 FCFA",
    pensionNumeric: 130000,
    duration: "2 mois accélérés",
    equipment: "Support de cours offert"
  }
];

export default function PricingDownloadSection({
  onNavigate,
  onRegisterTraining
}: PricingDownloadSectionProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "DQP" | "CQP" | "AQP">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const pdfUrl = "/documents/Tarifaire-2026-2027-CAMUQ-TWINS.pdf";

  // Filter formations
  const filteredFormations = useMemo(() => {
    return FORMATIONS_TARIFF_DATA.filter((item) => {
      const matchesTab = activeTab === "all" || item.type === activeTab;
      const term = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term) ||
        item.levelRequired.toLowerCase().includes(term);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleSelectFormation = (formationName: string) => {
    if (onRegisterTraining) {
      onRegisterTraining(formationName);
    } else {
      onNavigate("contact", `Pré-inscription formation : ${formationName}`);
    }
  };

  const handleWhatsAppHelp = () => {
    const message = encodeURIComponent(
      "Bonjour CAMUQ & TWINS TRAINING, j'ai consulté votre grille tarifaire 2026-2027 et je souhaite avoir plus de précisions sur les inscriptions et la réduction de 5%."
    );
    window.open(`https://wa.me/237675231283?text=${message}`, "_blank");
  };

  return (
    <section
      id="grille-tarifaire-section"
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 relative overflow-hidden border-b border-slate-200"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-blue-600/5 via-yellow-400/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/10 border border-blue-900/20 text-blue-950 text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4 text-blue-800" />
            <span>CENTRE AGRÉÉ PAR LE MINEFOP • CFP C&amp;T-T</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-950 tracking-tight leading-tight">
            Grille Tarifaire Officielle <span className="text-yellow-600">2026-2027</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Consultez les pensions, les durées et les diplômes d&apos;État (DQP, CQP, Langues). 
            Téléchargez le document officiel complet ou explorez les filières ci-dessous.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl shadow-xs border border-slate-200">
              <Calendar className="w-4 h-4 text-yellow-600" /> Rentrée : <strong>Lundi 12 Octobre 2026</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl shadow-xs border border-slate-200">
              <Building2 className="w-4 h-4 text-blue-900" /> Campus Nkolfoulou — Face Ndanga Hôtel
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl shadow-xs font-black">
              <Percent className="w-4 h-4 text-emerald-600" /> -5% de remise pour les 5 premiers inscrits !
            </span>
          </div>
        </div>

        {/* HERO DOCUMENT DOWNLOAD CARD */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl text-white p-6 sm:p-10 shadow-2xl border border-blue-800/60 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 -translate-x-12 translate-y-12 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Visual Document Badge Icon */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative group mb-4">
                <div className="w-28 h-36 sm:w-32 sm:h-44 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl flex flex-col justify-between p-4 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-widest uppercase bg-red-600 text-white px-2 py-0.5 rounded shadow">
                      PDF
                    </span>
                    <Award className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-center py-2">
                    <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto" />
                    <span className="text-[10px] font-black uppercase text-slate-200 block mt-1">
                      Tarifaire 2026
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-300 font-semibold border-t border-white/10 pt-1 text-center">
                    2 Pages • 245 Ko
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                  Officiel
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-black text-white">Document Officiel de Tarification</h4>
                <p className="text-xs text-slate-300">
                  Émis par la Direction CAMUQ &amp; TWINS TRAINING. Année Académique 2026-2027.
                </p>
              </div>
            </div>

            {/* Extracted Key Benefits in Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-1.5 text-yellow-400 font-bold mb-1">
                    <GraduationCap className="w-4 h-4" /> Formations DQP (1 an)
                  </div>
                  <p className="text-slate-200">
                    9 mois de cours + 3 mois de stage garanti. Dès <strong>300 000 FCFA</strong>. Inscription : <strong>35 000 FCFA</strong>.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-1.5 text-yellow-400 font-bold mb-1">
                    <BookOpen className="w-4 h-4" /> Certificats CQP (6 mois)
                  </div>
                  <p className="text-slate-200">
                    3 mois de cours + 3 mois de stage. Dès <strong>200 000 FCFA</strong>. Inscription : <strong>15 000 FCFA</strong>.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-1.5 text-yellow-400 font-bold mb-1">
                    <Sparkles className="w-4 h-4" /> Langues Vivantes (2 mois)
                  </div>
                  <p className="text-slate-200">
                    Anglais, Chinois, Français. Dès <strong>130 000 FCFA</strong> avec supports offerts.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" /> Facilités de Paiement
                  </div>
                  <p className="text-slate-200">
                    Paiement échelonné en 3 tranches (DQP) ou 2 tranches (CQP &amp; Langues).
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 italic flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Formations personnalisées disponibles, flexibles et négociables selon vos besoins.</span>
              </div>
            </div>

            {/* Direct Download Actions */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <a
                href={pdfUrl}
                download="Grille-Tarifaire-2026-2027-CAMUQ-TWINS.pdf"
                className="w-full px-5 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-yellow-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 text-center cursor-pointer"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>Télécharger la Grille (PDF)</span>
              </a>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-yellow-400" />
                <span>Consulter en ligne</span>
              </a>

              <button
                onClick={handleWhatsAppHelp}
                className="w-full px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-yellow-400" />
                <span>Des questions ? WhatsApp</span>
              </button>
            </div>

          </div>
        </div>

        {/* INTERACTIVE FORMATIONS BROWSER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-blue-950 flex items-center gap-2">
                <span>Détail des 18 Filières &amp; Pensions</span>
                <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full">
                  {filteredFormations.length} filières
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Filtrez par type de diplôme ou recherchez directement votre domaine de compétence.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div className="relative min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher une filière..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all text-slate-800"
                />
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeTab === "all"
                      ? "bg-blue-950 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tous (18)
                </button>
                <button
                  onClick={() => setActiveTab("DQP")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeTab === "DQP"
                      ? "bg-blue-950 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  DQP (11)
                </button>
                <button
                  onClick={() => setActiveTab("CQP")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeTab === "CQP"
                      ? "bg-blue-950 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  CQP (4)
                </button>
                <button
                  onClick={() => setActiveTab("AQP")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeTab === "AQP"
                      ? "bg-blue-950 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Langues (3)
                </button>
              </div>
            </div>
          </div>

          {/* Formations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFormations.map((f) => (
              <div
                key={f.code}
                className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-900/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {f.popular && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-blue-950 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl-xl tracking-wider">
                    Très Demandé
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black bg-blue-950 text-yellow-400 px-2 py-0.5 rounded-md">
                      {f.code}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        f.type === "DQP"
                          ? "bg-blue-100 text-blue-900"
                          : f.type === "CQP"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-purple-100 text-purple-900"
                      }`}
                    >
                      {f.type === "DQP"
                        ? "Diplôme DQP"
                        : f.type === "CQP"
                        ? "Certificat CQP"
                        : "Attestation AQP"}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base group-hover:text-blue-900 transition-colors leading-snug">
                      {f.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block mt-0.5 italic">
                      {f.enName}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Niveau requis :</span>
                      <strong className="text-slate-800 text-right">{f.levelRequired}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Durée :</span>
                      <strong className="text-slate-800">{f.duration}</strong>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="text-slate-400">Matériel :</span>
                      <span className="text-slate-700 text-[11px] font-medium truncate max-w-[170px]" title={f.equipment}>
                        {f.equipment}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Pension annuelle
                    </span>
                    <span className="text-base font-black text-blue-950">
                      {f.pension}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectFormation(f.name)}
                    className="px-3.5 py-2 bg-blue-950 hover:bg-yellow-400 text-white hover:text-blue-950 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>S&apos;inscrire</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFormations.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">Aucune formation ne correspond à votre recherche.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="mt-3 text-xs font-bold text-blue-900 underline cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

        </div>

        {/* AT-A-GLANCE DETAILS (Page 2 extracted information) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Modalités de Paiement */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-900/10 text-blue-900 flex items-center justify-center font-black">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-lg">Modalités de Paiement Échelonnées</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Des facilités pour vous permettre d&apos;étudier sereinement.
              </p>
            </div>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="text-blue-950 block font-bold">Pour le DQP :</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>50%</strong> à l&apos;inscription</li>
                  <li><strong>30%</strong> avant le 31 octobre</li>
                  <li><strong>20%</strong> avant le 31 janvier</li>
                </ul>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="text-blue-950 block font-bold">Pour le CQP &amp; Langues :</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>70%</strong> à l&apos;inscription</li>
                  <li><strong>30%</strong> au début du 2ème mois</li>
                </ul>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 bg-yellow-50/80 p-2.5 rounded-xl border border-yellow-200/70">
              * Frais d&apos;inscription : <strong>35 000 FCFA</strong> (DQP) ou <strong>15 000 FCFA</strong> (CQP/Langues).
            </div>
          </div>

          {/* Card 2: Constitution du Dossier */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/20 text-yellow-800 flex items-center justify-center font-black">
              <FolderCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-lg">Dossier d&apos;Inscription Requis</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Pièces à fournir lors de votre inscription au campus.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Photocopie du diplôme exigé selon la filière</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Photocopie de la Carte Nationale d&apos;Identité (CNI)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Une rame de papier A4 80g</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Une photo 4x4 couleur</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Le plan de localisation du lieu de résidence</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Une chemise cartonnée</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Nos Atouts Pédagogiques */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-6 shadow-md text-white space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-blue-950 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-white text-lg">Nos Atouts Majeurs</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Pourquoi choisir CAMUQ &amp; TWINS TRAINING ?
              </p>
            </div>
            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">✔</span>
                <span><strong>70% de pratique</strong> et 30% de théorie</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">✔</span>
                <span>Stages pratiques garantis en entreprise</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">✔</span>
                <span>Formateurs qualifiés et expérimentés</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">✔</span>
                <span>Salle informatique moderne, Wi-Fi gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">✔</span>
                <span>Formation à la carte disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">✔</span>
                <span>Service d&apos;orientation &amp; insertion professionnelle</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-400">✔</span>
                <span>Campus sécurisé et facilement accessible</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate("training")}
                className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Voir le programme complet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
