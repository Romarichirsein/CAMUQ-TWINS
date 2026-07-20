import React, { useState } from "react";
import { Menu, X, Phone, Mail, Globe } from "lucide-react";
import { COMPANY_NAME, COMPANY_PHONES, COMPANY_EMAIL } from "../data";
import Logo from "./Logo";

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Accueil" },
    { id: "services", label: "Nos Services" },
    { id: "training", label: "Formations" },
    { id: "estimator", label: "Estimateur & Devis" },
    { id: "ai-bot", label: "Assistant IA" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* Top micro-bar for direct contact details */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-850 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <a href={`tel:${COMPANY_PHONES[0].replace(/\s+/g, '')}`} className="hover:text-yellow-400 transition-colors">
                {COMPANY_PHONES[0]}
              </a>
              <span className="mx-1 text-gray-500">|</span>
              <a href={`tel:${COMPANY_PHONES[1].replace(/\s+/g, '')}`} className="hover:text-yellow-400 transition-colors">
                {COMPANY_PHONES[1]}
              </a>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-yellow-400" />
              <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-yellow-400 transition-colors">
                {COMPANY_EMAIL}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-yellow-400">
            <Globe className="w-3.5 h-3.5 animate-spin-slow text-white" />
            <span>Papeterie Bilingue & Services</span>
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
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-900 font-semibold border-b-2 border-blue-800"
                      : "text-gray-600 hover:text-blue-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleItemClick("estimator")}
              className="ml-4 px-5 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              Obtenir un Devis
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
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
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-100 animate-slide-down">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-2 px-4">
              <button
                onClick={() => handleItemClick("estimator")}
                className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold text-center tracking-wide shadow-md transition-all duration-200 block"
              >
                Calculateur de Devis Gratuit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
