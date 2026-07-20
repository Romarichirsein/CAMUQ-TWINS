import React, { useState } from "react";
import { Calendar, Clock, Check, AlertCircle, ShieldCheck } from "lucide-react";
import { FORMATIONS_DATA, SERVICES_DATA } from "../data";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "Initiation à l'Intelligence Artificielle",
    date: "",
    time: "09:00",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableHours = [
    "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const combinedServices = [
    ...FORMATIONS_DATA.map(f => `Formation : ${f.name}`),
    ...SERVICES_DATA.map(s => `Service : ${s.name}`)
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone || !formData.date) {
      setError("Veuillez remplir les champs obligatoires (Nom, Email, Téléphone, Date).");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setSuccess(result.appointment);
        setFormData({
          clientName: "",
          clientEmail: "",
          clientPhone: "",
          serviceType: "Initiation à l'Intelligence Artificielle",
          date: "",
          time: "09:00",
          notes: ""
        });
      } else {
        setError(result.error || "Une erreur s'est produite.");
      }
    } catch (err) {
      setError("Erreur réseau lors de l'enregistrement de votre rendez-vous.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="appointment-view" className="py-16 bg-white animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
            Prise de Rendez-vous Directe
          </span>
          <h2 className="font-sans font-black text-3xl text-blue-950 tracking-tight">
            Planifiez Votre Consultation Gratuite
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Gagnez du temps en réservant un créneau horaire avec l&apos;un de nos experts académiques ou conseillers d&apos;imprimerie directement depuis notre plateforme.
          </p>
        </div>

        {success ? (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-150 p-8 rounded-3xl flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto animate-fade-in shadow-md">
            <Check className="w-14 h-14 text-emerald-600 bg-white rounded-full p-3.5 shadow-sm border border-emerald-100" />
            <h3 className="font-sans font-black text-xl text-emerald-950">Rendez-vous pré-enregistré !</h3>
            <div className="text-xs sm:text-sm text-emerald-800 space-y-2 leading-relaxed">
              <p>
                Votre rendez-vous pour le <strong className="text-emerald-950">{success.date} à {success.time}</strong> concernant &ldquo;<strong className="text-emerald-950">{success.serviceType}</strong>&rdquo; est enregistré sous le code de suivi <strong className="text-emerald-950">{success.id}</strong>.
              </p>
              <p className="text-xs text-emerald-600">
                Un SMS et un email de confirmation vous seront envoyés dès validation par l&apos;un de nos employés.
              </p>
            </div>
            <button
              onClick={() => setSuccess(null)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Prendre un autre rendez-vous
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto space-y-6">
            <h3 className="font-sans font-black text-lg sm:text-xl text-blue-950 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-900" />
              Formulaire de réservation horaire
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 text-red-800 border border-red-150 rounded-xl flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase block">Nom Complet *</label>
                <input 
                  type="text"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Ex: Samuel Eto'o"
                  className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block">Adresse Email *</label>
                  <input 
                    type="email"
                    name="clientEmail"
                    required
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="Ex: samuel@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block">Numéro de Téléphone *</label>
                  <input 
                    type="text"
                    name="clientPhone"
                    required
                    value={formData.clientPhone}
                    onChange={handleChange}
                    placeholder="Ex: 675 23 12 83"
                    className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase block">Service ou Formation Concerné *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                >
                  {combinedServices.map((srv) => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block">Date souhaitée *</label>
                  <input 
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm text-gray-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block">Créneau Horaire *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                  >
                    {availableHours.map((hr) => (
                      <option key={hr} value={hr}>{hr} (Heure locale)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase block">Notes additionnelles / questions</label>
                <textarea 
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Expliquez brièvement votre situation ou vos objectifs pour maximiser l'efficacité de la rencontre..."
                  className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? "Réservation en cours..." : "Planifier mon rendez-vous"}
                </button>
              </div>

              <div className="flex items-center gap-1.5 justify-center text-[11px] text-gray-400 pt-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Traitement confidentiel & sécurisé des données</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
