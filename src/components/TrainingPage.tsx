import React, { useState } from "react";
import * as Icons from "lucide-react";
import { FORMATIONS_DATA, VACATION_TRAINING_EVENT, FREE_TRAINING_EVENT } from "../data";
import { useLanguage } from "../context/LanguageContext";

interface TrainingPageProps {
  onRegister: (formationName: string) => void;
}

export default function TrainingPage({ onRegister }: TrainingPageProps) {
  const [selectedFormation, setSelectedFormation] = useState<typeof FORMATIONS_DATA[0] | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [activeGalleryImage, setActiveGalleryImage] = useState<{ url: string; title: string; caption: string } | null>(null);
  const [isFlyerZoomed, setIsFlyerZoomed] = useState(false);

  const { lang, t } = useLanguage();
  const trT = t.training;

  const levels = ["all", "Débutant", "Intermédiaire", "Expert"];

  const getLevelLabel = (lvl: string) => {
    if (lvl === "all") return trT.allLevels;
    if (lvl === "Débutant") return trT.levelBeginner;
    if (lvl === "Intermédiaire") return trT.levelIntermediate;
    if (lvl === "Expert") return trT.levelExpert;
    return lvl;
  };

  const dqpFormations = [
    {
      code: "SB",
      name: "Secrétariat Bureautique",
      enName: "Office Automation Secretaryship",
      level: "3e / BEPC / CAP / O'L",
      desc: "Maîtrise de la suite Microsoft Office (Word, Excel, PowerPoint) et organisation administrative.",
      icon: "FileText"
    },
    {
      code: "SBB",
      name: "Secrétariat Bureautique Bilingue",
      enName: "Bilingual Secretaryship",
      level: "Tle / Upper sixth",
      desc: "Gestion de secrétariat en Anglais et Français des affaires avec rédaction et accueil bilingue.",
      icon: "Globe"
    },
    {
      code: "SC",
      name: "Secrétariat Comptable",
      enName: "Accounting Secretaryship",
      level: "1ère / Lower sixth",
      desc: "Tenue des registres comptables, gestion des pièces justificatives et saisie des opérations financières.",
      icon: "Calculator"
    },
    {
      code: "SD",
      name: "Secrétariat de Direction",
      enName: "Executive Secretary",
      level: "BAC / A Level",
      desc: "Assistance de haut niveau aux dirigeants, gestion d'agenda, organisation de réunions et suivi de dossiers.",
      icon: "Briefcase"
    },
    {
      code: "CIG",
      name: "Comptabilité Informatisée et Gestion",
      enName: "Computerized Account. & Mgt",
      level: "Tle / Upper sixth",
      desc: "Pratique des logiciels comptables (Sage SAARI), bilan, paie et comptabilité analytique d'entreprise.",
      icon: "TrendingUp"
    },
    {
      code: "MI",
      name: "Maintenance Informatique",
      enName: "Computer Maintenance",
      level: "1ère / Lower sixth",
      desc: "Diagnostic, réparation matérielle et logicielle, assemblage d'ordinateurs et installation de systèmes.",
      icon: "Wrench"
    },
    {
      code: "MRI",
      name: "Maintenance des Réseaux Informatiques",
      enName: "Computer Netw. Maintenance",
      level: "Tle Sc. / Upper sixth Sc",
      desc: "Câblage structuré, configuration des routeurs, switchs, administration réseau et sécurité système.",
      icon: "Network"
    },
    {
      code: "DA",
      name: "Développement d'Application",
      enName: "Application Development",
      level: "BAC Scient. / A Level Sc",
      desc: "Programmation web et mobile (HTML, CSS, JavaScript, Python), conception de bases de données et logiciels.",
      icon: "Code"
    },
    {
      code: "GP",
      name: "Graphisme de Production",
      enName: "Production of Graphic Design",
      level: "Tle / Upper sixth",
      desc: "Création visuelle PAO avec Adobe Photoshop, Illustrator & InDesign pour l'imprimerie et la publicité.",
      icon: "Palette"
    },
    {
      code: "MOAV",
      name: "Montage Audiovisuel",
      enName: "Audio-Visual Editing",
      level: "3e / BEPC / CAP / O'L",
      desc: "Montage vidéo professionnel, étalonnage, traitement sonore et motion design (Premiere, After Effects).",
      icon: "Video"
    },
    {
      code: "WM",
      name: "Webmestre",
      enName: "Webmaster",
      level: "BAC / A Level",
      desc: "Gestion, administration et maintenance de sites web, référencement SEO et sécurité des plateformes.",
      icon: "Layout"
    }
  ];

  const cqpFormations = [
    {
      name: "Langue Anglaise 🇬🇧",
      desc: "Perfectionnement intensif en Anglais commercial, conversationnel et préparation aux opportunités internationales.",
      icon: "Languages"
    },
    {
      name: "Langue Chinoise 🇨🇳",
      desc: "Apprentissage du Mandarin (expression orale, écriture des caractères, négociation et culture d'affaires chinoise).",
      icon: "Languages"
    },
    {
      name: "Langue Française 🇫🇷",
      desc: "Renforcement de la grammaire, rédaction administrative et communication orale professionnelle.",
      icon: "Languages"
    },
    {
      name: "Marketing Digital",
      desc: "Publicité Facebook/Google Ads, stratégie de contenu, community management et analyse d'audience.",
      icon: "Target"
    },
    {
      name: "Sécurité Informatique",
      desc: "Protection des données, prévention des piratages, cybersécurité d'entreprise et bonnes pratiques.",
      icon: "ShieldCheck"
    },
    {
      name: "Montage de Visuels et Création de Contenus",
      desc: "Conception rapide de flyers, affiches et vidéos courtes optimisées pour les réseaux sociaux.",
      icon: "Image"
    },
    {
      name: "Intelligence Artificielle",
      desc: "Utilisation pratique de ChatGPT, Midjourney, Claude et automatisation des workflows professionnels.",
      icon: "Brain"
    }
  ];

  const filteredFormations = filterLevel === "all" 
    ? FORMATIONS_DATA 
    : FORMATIONS_DATA.filter(f => f.level === filterLevel);

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  const handleWhatsAppEnroll = (formationName: string) => {
    const text = encodeURIComponent(
      `Bonjour CAMUQ & TWINS TRAINING, je souhaite m'inscrire à la formation : ${formationName} pour la rentrée du 14 Septembre 2026.`
    );
    window.open(`https://wa.me/237675231283?text=${text}`, "_blank");
  };

  return (
    <div id="training-view" className="bg-slate-50 animate-fade-in pb-16">
      
      {/* Full-width Hero Header Banner */}
      <div className="relative w-full py-24 sm:py-32 min-h-[380px] flex items-center justify-center bg-slate-950 overflow-hidden text-white mb-12 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/banniere-nos-formations.jpg" 
            alt="Nos Formations CAMUQ & TWINS EMPIRE — Salle informatique équipée" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-slate-950/80 to-blue-950/90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-yellow-400/40 shadow-md">
              CENTRE DE FORMATION PROFESSIONNELLE CFP C&T-T
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-300 bg-emerald-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-400/40 shadow-md flex items-center gap-1.5">
              <Icons.Award className="w-4 h-4 text-emerald-400" /> Agréé par le MINEFOP
            </span>
          </div>

          <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight text-balance drop-shadow-lg">
            CAMUQ AND TWINS TRAINING
          </h1>
          <p className="text-sm sm:text-xl text-yellow-400 font-extrabold tracking-wider uppercase drop-shadow-md">
            Ambition — Compétence — Réalisation
          </p>
          <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-medium max-w-3xl mx-auto text-balance">
            Des Formations Diplômantes (DQP) et Certifiantes (CQP) pour l&apos;insertion professionnelle rapide des jeunes et des salariés au Cameroun.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ANNONCE OFFICIELLE DE RENTRÉE 2026-2027 BANNER CARD */}
        <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-blue-800/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 bg-yellow-400 text-blue-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  <Icons.Sparkles className="w-4 h-4 fill-blue-950" />
                  Rentrée Académique Officielle 2026-2027
                </span>

                <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight pt-1">
                  LUNDI 14 SEPTEMBRE 2026 À 7H30
                </h2>
                
                <div className="flex items-center gap-2 text-yellow-300 text-xs sm:text-sm font-bold">
                  <Icons.MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Au Campus de Nkolfoulou — Face Ndanga Hotel (Yaoundé)</span>
                </div>
              </div>

              {/* Promotion Banner */}
              <div className="bg-yellow-400/15 border border-yellow-400/40 p-4 rounded-2xl flex items-center gap-4 text-slate-100 backdrop-blur-sm">
                <div className="p-3 bg-yellow-400 text-blue-950 rounded-xl font-black text-lg shrink-0">
                  -5%
                </div>
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="text-yellow-400 uppercase font-black block">PROMOTION SPÉCIALE EN COURS !</strong>
                  Une remise de <strong>5%</strong> est offerte aux <strong>5 premiers candidats</strong> qui paieront en totalité leur pension !
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleWhatsAppEnroll("Rentrée Septembre 2026")}
                  className="px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Icons.MessageSquare className="w-4 h-4" />
                  S&apos;inscrire à la Rentrée du 14 Septembre
                </button>

                <button
                  onClick={() => onRegister("Rentrée Académique 2026-2027")}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                >
                  Réserver en ligne
                </button>
              </div>

            </div>

            {/* Right Flyer Poster Preview Column */}
            <div className="lg:col-span-5 relative group">
              <div 
                className="rounded-2xl overflow-hidden border-2 border-yellow-400/40 shadow-2xl bg-slate-950 cursor-pointer relative"
                onClick={() => setIsFlyerZoomed(true)}
              >
                <img 
                  src="/images/affiche-rentree-2026.jpg" 
                  alt="Affiche Officielle Rentrée Académique 2026-2027 CAMUQ & TWINS TRAINING"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2 backdrop-blur-[2px]">
                  <Icons.Maximize2 className="w-5 h-5 text-yellow-400" /> Cliquer pour voir l&apos;affiche grand format
                </div>
              </div>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Affiche officielle du Centre de Formation Professionnelle CFP C&T-T
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 1: FORMATIONS DIPLÔMANTES (DQP) */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              Formations Diplômantes
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-blue-950">
              POUR AVOIR LE DQP (Diplôme de Qualification Professionnelle)
            </h2>
            <p className="text-sm text-gray-500">
              Des formations pratiques agréées par le MINEFOP préparant directement à un diplôme officiel d&apos;État.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dqpFormations.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-150 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl border border-blue-100">
                        {renderIcon(item.icon, "w-6 h-6")}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider bg-blue-900 text-yellow-400 px-2.5 py-1 rounded-md shadow-sm">
                        CODE : {item.code}
                      </span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
                      Diplôme DQP
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-extrabold text-lg text-blue-950">
                      {item.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-gray-400 italic block">
                      {item.enName}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Niveau d&apos;accès :</span>
                    <span className="font-extrabold text-blue-950">{item.level}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleWhatsAppEnroll(`${item.name} (${item.code})`)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm text-center cursor-pointer"
                  >
                    S&apos;inscrire
                  </button>
                  <button
                    onClick={() => onRegister(`${item.name} (${item.code})`)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: FORMATIONS CERTIFIANTES (CQP) */}
        <section className="space-y-8 bg-slate-100/70 p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-yellow-700 bg-yellow-100 px-3.5 py-1.5 rounded-full border border-yellow-200">
              Formations Certifiantes
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-blue-950">
              POUR AVOIR LE CQP (Certificat de Qualification Professionnelle)
            </h2>
            <p className="text-sm text-gray-500">
              Des modules intensifs pour acquérir des compétences concrètes et certifiées sur le marché du travail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cqpFormations.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-150 hover:border-yellow-400 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-yellow-50 text-yellow-700 rounded-2xl border border-yellow-200">
                      {renderIcon(item.icon, "w-6 h-6")}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-100 text-yellow-950 border border-yellow-300 px-2.5 py-1 rounded-md">
                      Certificat CQP
                    </span>
                  </div>

                  <h3 className="font-sans font-extrabold text-lg text-blue-950">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleWhatsAppEnroll(item.name)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 text-xs font-black uppercase tracking-wider transition-colors shadow-sm text-center cursor-pointer"
                  >
                    S&apos;inscrire
                  </button>
                  <button
                    onClick={() => onRegister(item.name)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <span className="text-sm font-black text-blue-950 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm inline-block">
              ✨ Et plusieurs AUTRES MÉTIERS disponibles au centre !
            </span>
          </div>
        </section>

        {/* SECTION 3: CATALOGUE DE FORMATIONS PRATIQUES COMPLÈTEMENT DÉTAILLÉES */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h3 className="font-sans font-black text-xl text-blue-950">
                Catalogue Général des Modules Pratiques
              </h3>
              <p className="text-xs text-gray-500">Filtrer les formations par niveau d&apos;expertise</p>
            </div>

            {/* Level Filters bar */}
            <div className="flex flex-wrap items-center gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    filterLevel === lvl
                      ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                      : "bg-white text-gray-600 border border-gray-150 hover:bg-gray-50"
                  }`}
                >
                  {getLevelLabel(lvl)}
                </button>
              ))}
            </div>
          </div>

          {/* Formations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((form) => (
              <div 
                key={form.id} 
                className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-150 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image & Ribbon Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img 
                    src={form.image} 
                    alt={form.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] bg-blue-900/90 text-white font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                      {form.level}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-yellow-400 text-blue-950 px-3.5 py-1.5 rounded-2xl shadow-md font-black text-xs uppercase tracking-wider">
                    Sur inscription
                  </div>
                </div>

                {/* Training Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-yellow-600">
                      <div className="p-1.5 rounded-lg bg-yellow-50 text-yellow-600">
                        {renderIcon(form.icon, "w-4 h-4")}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Durée : {form.duration}</span>
                    </div>
                    <h3 className="font-sans font-black text-lg sm:text-xl text-blue-950 group-hover:text-blue-900 transition-colors">
                      {form.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {form.description}
                    </p>
                  </div>

                  {/* Submitting Actions */}
                  <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
                    <button
                      onClick={() => handleWhatsAppEnroll(form.name)}
                      className="flex-1 py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer text-center"
                    >
                      S&apos;inscrire Maintenant
                    </button>
                    <button
                      onClick={() => setSelectedFormation(form)}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-blue-900 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer"
                      title="En savoir plus"
                    >
                      <Icons.Info className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ÉVÉNEMENT 1 : ÉDITION SPÉCIALE VACANCES UTILES */}
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 bg-yellow-400 text-blue-950 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                <Icons.Sparkles className="w-4 h-4 fill-blue-950" />
                {VACATION_TRAINING_EVENT.subtitle}
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight pt-2">
                {VACATION_TRAINING_EVENT.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-blue-950/80 px-4 py-2 rounded-xl border border-blue-800 text-yellow-300 text-xs font-bold">
              <Icons.Calendar className="w-4 h-4 text-yellow-400" />
              <span>{VACATION_TRAINING_EVENT.dates}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-base text-slate-200 leading-relaxed bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                {VACATION_TRAINING_EVENT.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VACATION_TRAINING_EVENT.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    <Icons.Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/15 text-center space-y-4 flex flex-col justify-center items-center">
              <Icons.Award className="w-10 h-10 text-yellow-400" />
              <div>
                <h3 className="font-bold text-lg text-white">Impact & Insertion des Jeunes</h3>
                <p className="text-xs text-slate-300 mt-1">Initiation informatique et pratique au campus de Nkolfoulou (9 à 17 ans).</p>
              </div>
              <button
                onClick={() => handleWhatsAppEnroll("Vacances Utiles Informatique Jeunes")}
                className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                Inscrire mon enfant
              </button>
            </div>
          </div>

          {/* Photo Gallery Grid for Vacances Utiles */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-400 flex items-center gap-2">
              <Icons.Camera className="w-4 h-4" /> Galerie Photos : Édition Vacances Utiles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VACATION_TRAINING_EVENT.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveGalleryImage(img)}
                  className="group relative h-48 rounded-2xl overflow-hidden border border-slate-700 shadow-md cursor-pointer bg-slate-800"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors">{img.title}</span>
                    <span className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">{img.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ÉVÉNEMENT 2 : FORMATION GRATUITE DE 2 MOIS (MARS - AVRIL 2026) */}
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-blue-800/40 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 bg-emerald-400 text-slate-950 text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                <Icons.HeartHandshake className="w-4 h-4 fill-slate-950" />
                {FREE_TRAINING_EVENT.subtitle}
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight pt-2">
                {FREE_TRAINING_EVENT.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-emerald-300 text-xs font-bold">
              <Icons.Clock className="w-4 h-4 text-emerald-400" />
              <span>{FREE_TRAINING_EVENT.dates}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-base text-slate-200 leading-relaxed bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
                {FREE_TRAINING_EVENT.description}
              </p>

              {/* Highlights without certificates */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">Points Clés de la Formation :</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {FREE_TRAINING_EVENT.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <Icons.CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notice regarding attestation */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3">
                <Icons.Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
                  <strong>Précision :</strong> {FREE_TRAINING_EVENT.noteAttestation} Il s&apos;agissait d&apos;une initiative bénévole et solidaire d&apos;insertion axée exclusivement sur la pratique et l&apos;apprentissage gratuit de l&apos;outil informatique.
                </p>
              </div>
            </div>

            {/* Video Showcase Player */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-950/90 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md border border-emerald-400/30">
                    <Icons.PlayCircle className="w-4 h-4 text-emerald-400" /> Vidéo de Présentation
                  </span>
                  <span className="text-[11px] text-slate-400">Campus de Nkolfoulou</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl">
                  <video
                    controls
                    preload="metadata"
                    controlsList="nodownload"
                    poster={FREE_TRAINING_EVENT.videoPoster}
                    className="w-full max-h-[380px] object-contain mx-auto rounded-2xl"
                  >
                    <source src={FREE_TRAINING_EVENT.videoUrl} type="video/mp4" />
                    <source src="/video-formation-vacances.mp4" type="video/mp4" />
                    Votre navigateur ne prend pas en charge la lecture de cette vidéo.
                  </video>
                </div>

                <p className="text-xs text-slate-400 italic text-center">
                  Aperçu des ateliers d&apos;apprentissage pratique lors de la formation gratuite de 2 mois dispensée au centre de Nkolfoulou.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info Modal */}
        {selectedFormation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-150 overflow-y-auto max-h-[90vh]">
              <button 
                onClick={() => setSelectedFormation(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-950 transition-colors cursor-pointer"
              >
                <Icons.X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
                  <img src={selectedFormation.image} alt={selectedFormation.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-xs bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-100 font-extrabold uppercase">
                      {selectedFormation.level}
                    </span>
                    <span className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full border border-yellow-100 font-extrabold uppercase">
                      {selectedFormation.duration}
                    </span>
                  </div>
                  <h3 className="font-sans font-black text-2xl text-blue-950">{selectedFormation.name}</h3>
                </div>

                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium text-gray-800">{selectedFormation.description}</p>
                  <p>{selectedFormation.longDescription || "Cette formation pratique intensive est jalonnée de cas réels d'entreprise, d'ateliers dirigés et d'un projet final validé par notre jury pour l'obtention de votre certificat professionnel CAMUQ & TWINS EMPIRE d'excellence."}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-widest">Coût d&apos;inscription</span>
                    <span className="text-lg font-black text-blue-900">Sur inscription / Devis</span>
                  </div>
                  <button
                    onClick={() => {
                      handleWhatsAppEnroll(selectedFormation.name);
                      setSelectedFormation(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                  >
                    Valider sur WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Image Lightbox Modal */}
        {activeGalleryImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" onClick={() => setActiveGalleryImage(null)}>
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setActiveGalleryImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-yellow-400 hover:text-blue-950 transition-all cursor-pointer"
              >
                <Icons.X className="w-6 h-6" />
              </button>
              
              <div className="relative max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={activeGalleryImage.url} 
                  alt={activeGalleryImage.title} 
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
                <span className="text-xs font-black uppercase text-yellow-400 tracking-wider">CAMUQ AND TWINS TRAINING — Atelier Pratique</span>
                <h3 className="font-sans font-black text-xl text-white">{activeGalleryImage.title}</h3>
                <p className="text-sm text-slate-300">{activeGalleryImage.caption}</p>
              </div>
            </div>
          </div>
        )}

        {/* Flyer Full Screen Lightbox Modal */}
        {isFlyerZoomed && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsFlyerZoomed(false)}
          >
            <div className="relative max-w-3xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsFlyerZoomed(false)}
                className="absolute -top-10 right-0 text-white p-2 hover:text-yellow-400 font-bold text-sm flex items-center gap-1 cursor-pointer"
              >
                <Icons.X className="w-6 h-6" /> Fermer l&apos;affiche
              </button>
              <img 
                src="/images/affiche-rentree-2026.jpg" 
                alt="Affiche Officielle Rentrée Académique 2026-2027 Agrandie" 
                className="max-h-[85vh] w-auto rounded-xl shadow-2xl border border-white/20"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
