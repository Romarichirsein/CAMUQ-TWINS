import React, { useState } from "react";
import { Menu, X, Phone, Mail, Globe, ChevronDown, Sparkles } from "lucide-react";
import { COMPANY_PHONES, COMPANY_EMAIL } from "../data";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  onNavigate: (section: string, subCategory?: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const { lang, t, toggleLang } = useLanguage();
  const navT = t.nav;

  const handleItemClick = (id: string, subCategory?: string) => {
    onNavigate(id, subCategory);
    setIsOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* Top micro-bar for direct contact details and language switch */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white text-xs py-2 px-4 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <a href={`tel:${COMPANY_PHONES[0].replace(/\s+/g, '')}`} className="hover:text-yellow-400 transition-colors">
                {COMPANY_PHONES[0]}
              </a>
              <span className="mx-1 text-blue-300/50">|</span>
              <a href={`tel:${COMPANY_PHONES[1].replace(/\s+/g, '')}`} className="hover:text-yellow-400 transition-colors">
                {COMPANY_PHONES[1]}
              </a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-yellow-400" />
              <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-yellow-400 transition-colors">
                {COMPANY_EMAIL}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Preheader Tagline Pill - Black bold text as requested */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs font-black tracking-wider uppercase text-slate-900 bg-yellow-400 px-3 py-0.5 rounded-full shadow-xs">
              <Globe className="w-3 h-3 animate-spin-slow text-slate-900" />
              <span>{navT.preheader}</span>
            </div>

            {/* Functional Language Switcher (FR / EN) */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
              title="Changer de langue / Switch language"
            >
              <span className={lang === "fr" ? "text-yellow-400 font-black" : "text-gray-300"}>FR</span>
              <span className="text-gray-400">/</span>
              <span className={lang === "en" ? "text-yellow-400 font-black" : "text-gray-300"}>EN</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Representation */}
          <div 
            onClick={() => handleItemClick("home")}
            className="cursor-pointer group"
          >
            <Logo variant="dark" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* 1. Accueil */}
            <button
              onClick={() => handleItemClick("home")}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeSection === "home"
                  ? "bg-blue-50 text-blue-950 font-extrabold border-b-2 border-blue-900"
                  : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              }`}
            >
              {navT.home}
            </button>

            {/* 2. Nos Services (Dropdown) */}
            <div className="relative group/dropdown py-2">
              <button
                onClick={() => handleItemClick("services")}
                className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  activeSection === "services"
                    ? "bg-blue-50 text-blue-950 font-extrabold border-b-2 border-blue-900"
                    : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                }`}
              >
                {navT.services}
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/dropdown:rotate-180 duration-200 text-gray-400" />
              </button>

              {/* Services Mega Dropdown */}
              <div className="absolute left-0 top-full w-80 rounded-2xl bg-white border border-gray-150 shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 z-50 p-3 space-y-1">
                <button
                  onClick={() => handleItemClick("services", "secretariat")}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors font-bold block"
                >
                  {navT.secretariat}
                </button>

                {/* Impression Submenu */}
                <div className="border-t border-gray-100 pt-1">
                  <div className="px-3.5 py-1 text-[10px] font-black uppercase text-yellow-600 tracking-wider">
                    {navT.impression}
                  </div>
                  <button
                    onClick={() => handleItemClick("services", "imprimerie")}
                    className="w-full text-left px-3.5 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-900 transition-colors block pl-6"
                  >
                    • {navT.impression}
                  </button>
                </div>

                {/* Édition Submenu */}
                <div className="border-t border-gray-100 pt-1">
                  <div className="px-3.5 py-1 text-[10px] font-black uppercase text-yellow-600 tracking-wider">
                    {navT.edition}
                  </div>
                  <button
                    onClick={() => handleItemClick("services", "edition")}
                    className="w-full text-left px-3.5 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-900 transition-colors block pl-6"
                  >
                    • {navT.edition}
                  </button>
                </div>

                <button
                  onClick={() => handleItemClick("products")}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors font-bold block border-t border-gray-100 pt-2"
                >
                  {navT.commerce} (Fournitures, Longrich, Bijoux)
                </button>

                <button
                  onClick={() => handleItemClick("services", "autres")}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors font-bold block"
                >
                  {navT.autre}
                </button>

                <button
                  onClick={() => handleItemClick("services", "personnalise")}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors font-bold block text-yellow-700 bg-yellow-50/50"
                >
                  {navT.personnalise} (CV, Rapports, Mémoires)
                </button>
              </div>
            </div>

            {/* 3. Nos Formations */}
            <button
              onClick={() => handleItemClick("training")}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeSection === "training"
                  ? "bg-blue-50 text-blue-950 font-extrabold border-b-2 border-blue-900"
                  : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              }`}
            >
              {navT.trainings}
            </button>

            {/* 4. À Propos (Dropdown: Notre histoire, Mot de la DG, Équipe dirigeante) */}
            <div className="relative group/aboutdropdown py-2">
              <button
                onClick={() => handleItemClick("about")}
                className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                  activeSection === "about"
                    ? "bg-blue-50 text-blue-950 font-extrabold border-b-2 border-blue-900"
                    : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                }`}
              >
                {navT.about}
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/aboutdropdown:rotate-180 duration-200 text-gray-400" />
              </button>

              <div className="absolute left-0 top-full w-64 rounded-2xl bg-white border border-gray-150 shadow-xl opacity-0 invisible group-hover/aboutdropdown:opacity-100 group-hover/aboutdropdown:visible transition-all duration-200 z-50 p-2.5 space-y-1">
                <button
                  onClick={() => handleItemClick("about")}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors font-bold block"
                >
                  {navT.history}
                </button>
                <button
                  onClick={() => handleItemClick("about")}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors font-bold block"
                >
                  {navT.ceoMessage}
                </button>
                <button
                  onClick={() => handleItemClick("about")}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-950 transition-colors font-bold block"
                >
                  {navT.leadership}
                </button>
              </div>
            </div>

            {/* 5. Assistant IA */}
            <button
              onClick={() => handleItemClick("ai-bot")}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeSection === "ai-bot"
                  ? "bg-blue-50 text-blue-950 font-extrabold border-b-2 border-blue-900"
                  : "text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              {navT.aiAssistant}
            </button>

            {/* 6. Main Contact Button (Far Right) */}
            <button
              onClick={() => handleItemClick("contact")}
              className="ml-3 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-sm tracking-wide shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              {navT.contact}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-full bg-blue-900 text-yellow-400 text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-blue-900 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-100 animate-slide-down max-h-[85vh] overflow-y-auto">
          <div className="px-3 pt-3 pb-6 space-y-2">
            <button
              onClick={() => handleItemClick("home")}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-base font-bold text-gray-800 hover:bg-blue-50"
            >
              {navT.home}
            </button>

            {/* Nos Services Mobile Dropdown */}
            <div className="space-y-1 border-l-2 border-blue-900 pl-3 my-2">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center justify-between w-full text-left py-2 text-base font-black text-blue-950"
              >
                <span>{navT.services}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {servicesDropdownOpen && (
                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => handleItemClick("services", "secretariat")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.secretariat}
                  </button>
                  <button
                    onClick={() => handleItemClick("services", "imprimerie")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.impression}
                  </button>
                  <button
                    onClick={() => handleItemClick("services", "edition")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.edition}
                  </button>
                  <button
                    onClick={() => handleItemClick("products")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.commerce}
                  </button>
                  <button
                    onClick={() => handleItemClick("services", "autres")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.autre}
                  </button>
                  <button
                    onClick={() => handleItemClick("services", "personnalise")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-yellow-700 bg-yellow-50"
                  >
                    • {navT.personnalise}
                  </button>
                </div>
              )}
            </div>

            {/* Nos Formations Mobile */}
            <button
              onClick={() => handleItemClick("training")}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-base font-bold text-gray-800 hover:bg-blue-50"
            >
              {navT.trainings}
            </button>

            {/* À Propos Mobile Dropdown */}
            <div className="space-y-1 border-l-2 border-yellow-400 pl-3 my-2">
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="flex items-center justify-between w-full text-left py-2 text-base font-black text-blue-950"
              >
                <span>{navT.about}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="space-y-1.5 pt-1">
                  <button
                    onClick={() => handleItemClick("about")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.history}
                  </button>
                  <button
                    onClick={() => handleItemClick("about")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.ceoMessage}
                  </button>
                  <button
                    onClick={() => handleItemClick("about")}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    • {navT.leadership}
                  </button>
                </div>
              )}
            </div>

            {/* Assistant IA Mobile */}
            <button
              onClick={() => handleItemClick("ai-bot")}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-base font-bold text-gray-800 hover:bg-blue-50"
            >
              {navT.aiAssistant}
            </button>

            {/* Contact Button Mobile */}
            <div className="pt-4 px-2">
              <button
                onClick={() => handleItemClick("contact")}
                className="w-full py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-center tracking-wide shadow-md cursor-pointer"
              >
                {navT.contact}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
