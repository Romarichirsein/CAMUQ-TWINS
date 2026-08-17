import React from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function WhatsAppButton() {
  const { lang, t } = useLanguage();
  const waT = t.whatsapp;
  const phoneNumber = "237675231283";
  const defaultMessage = encodeURIComponent(
    lang === "fr"
      ? "Bonjour CAMUQ & TWINS EMPIRE Ltd, je souhaite obtenir des informations sur vos services et prestations."
      : "Hello CAMUQ & TWINS EMPIRE Ltd, I would like to get information about your services."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={waT.label}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-3.5 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 transition-all duration-300 group cursor-pointer border-2 border-white/20"
    >
      <MessageCircle className="w-6 h-6 animate-pulse" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs uppercase tracking-wider">
        {waT.label}
      </span>
    </a>
  );
}
