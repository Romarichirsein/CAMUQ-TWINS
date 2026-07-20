import React, { useState } from "react";
import { Phone, Mail, Clock, Send, Check, Smartphone, Landmark, AlertCircle } from "lucide-react";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONES } from "../data";

interface ContactPageProps {
  prefilledSubject?: string;
}

export default function ContactPage({ prefilledSubject = "" }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: prefilledSubject || "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Veuillez remplir tous les champs obligatoires (Nom, Email, Message).");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError(result.error || "Une erreur s'est produite lors de l'envoi.");
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  // Pre-configured WhatsApp click launcher link
  const handleWhatsAppRedirect = () => {
    const formattedPhone = COMPANY_PHONES[0].replace(/\+/g, "").replace(/\s+/g, "");
    const text = encodeURIComponent(`Bonjour C&T Empire, je vous contacte depuis votre site internet concernant : ${formData.subject || 'Vos services'}.`);
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  return (
    <div id="contact-view" className="py-16 bg-slate-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-600 bg-yellow-100/60 px-3 py-1.5 rounded-full border border-yellow-200">
            Contactez C&T Empire
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Mettons en Place Votre Prochain Grand Projet
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Notre équipe commerciale et administrative est à votre écoute pour toute commande d&apos;imprimerie, conseil bilingue, projet d&apos;édition ou inscription académique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Contact Details & Maps block (Col span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-sans font-bold text-lg text-blue-950">
                Nos Canaux de Communication
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Téléphones directes</h4>
                    <div className="text-sm sm:text-base text-blue-950 font-bold mt-0.5">
                      <a href={`tel:${COMPANY_PHONES[0].replace(/\s+/g, '')}`} className="hover:underline block">
                        {COMPANY_PHONES[0]}
                      </a>
                      <a href={`tel:${COMPANY_PHONES[1].replace(/\s+/g, '')}`} className="hover:underline block">
                        {COMPANY_PHONES[1]}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Adresse Email</h4>
                    <a href={`mailto:${COMPANY_EMAIL}`} className="text-sm sm:text-base text-blue-950 font-bold mt-0.5 hover:underline break-all block">
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-gray-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Heures d&apos;ouverture</h4>
                    <p className="text-sm sm:text-base text-blue-950 font-bold mt-0.5 leading-snug">
                      Lundi - Samedi : 07h30 - 19h30
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Fermé le Dimanche</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Container Iframe mock styled premium */}
            <div className="rounded-3xl overflow-hidden border border-gray-150 h-64 shadow-md relative bg-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.141973041076!2d9.736561339396347!3d4.043640224163991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128be2e1767f%3A0xc95861491741ef0a!2sDouala%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1715000000000!5m2!1sfr!2sfr" 
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer"
              ></iframe>
              <div className="absolute bottom-3 left-3 bg-blue-950/90 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm shadow flex items-center gap-1.5 pointer-events-none">
                <Landmark className="w-3.5 h-3.5 text-yellow-400" />
                <span>C&T Empire Ltd, Cameroun</span>
              </div>
            </div>

          </div>

          {/* Interactive Form (Col span 7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-sans font-black text-xl text-blue-950 tracking-tight">
              Envoyez-nous un message sécurisé
            </h3>

            {success ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-150 p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                <Check className="w-12 h-12 text-emerald-600 bg-white rounded-full p-2.5 shadow-sm" />
                <h4 className="font-bold text-lg text-emerald-950">Message envoyé !</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-emerald-800">
                  Merci de nous faire confiance. Notre conseiller bilingue va analyser vos spécifications et vous recontacter par email ou téléphone sous 2 heures ouvrables.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 bg-red-50 text-red-800 border border-red-150 rounded-xl flex items-center gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block">Votre Nom complet *</label>
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Samuel Eto'o"
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-900 focus:bg-white rounded-xl text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block">Adresse Email *</label>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ex: samuel@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-900 focus:bg-white rounded-xl text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block">Numéro de téléphone</label>
                    <input 
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ex: 675 23 12 83"
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-900 focus:bg-white rounded-xl text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block">Sujet de votre demande</label>
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Ex: Devis pour flyers ou inscription IA"
                      className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-900 focus:bg-white rounded-xl text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block">Spécifications détaillées / Message *</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Détaillez vos besoins d'impressions (dimensions, finitions, quantité) ou vos questions concernant nos formations..."
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-blue-900 focus:bg-white rounded-xl text-sm outline-none transition-all"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    {submitting ? "Envoi en cours..." : "Envoyer mon message"}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Smartphone className="w-4 h-4 shrink-0 text-yellow-400" />
                    Contacter via WhatsApp
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
