import React, { useState } from "react";
import { Calendar, Clock, Check, AlertCircle, ShieldCheck } from "lucide-react";
import { FORMATIONS_DATA, SERVICES_DATA } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function AppointmentPage() {
  const { t, lang } = useLanguage();
  const apT = t.appointment;

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: lang === "fr" ? "Initiation à l'Intelligence Artificielle" : "AI Initiation Training",
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
    ...FORMATIONS_DATA.map(f => `${lang === "fr" ? "Formation" : "Training"} : ${f.name}`),
    ...SERVICES_DATA.map(s => `${lang === "fr" ? "Service" : "Service"} : ${s.name}`)
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone || !formData.date) {
      setError(apT.validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    const messageText = 
`Bonjour CAMUQ & TWINS EMPIRE,

Je souhaite réserver un rendez-vous / inscription depuis votre site web :

👤 Nom complet : ${formData.clientName}
📧 Email : ${formData.clientEmail}
📞 Téléphone : ${formData.clientPhone}
📚 Service / Formation : ${formData.serviceType}
📅 Date souhaitée : ${formData.date} à ${formData.time}
📝 Notes particulières : ${formData.notes || 'Aucune'}`;

    const targetPhone = "237675231283";
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(messageText)}`;
    
    // Direct launch to WhatsApp
    window.open(whatsappUrl, "_blank");

    setSuccess({
      id: "RDV-" + Date.now(),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      serviceType: formData.serviceType,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      status: "pending",
      createdAt: new Date().toISOString()
    });

    setSubmitting(false);
    setFormData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceType: lang === "fr" ? "Initiation à l'Intelligence Artificielle" : "AI Initiation Training",
      date: "",
      time: "09:00",
      notes: ""
    });
  };

  return (
    <div id="appointment-view" className="py-16 bg-white animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
            {apT.pageTag}
          </span>
          <h2 className="font-sans font-black text-3xl text-blue-950 tracking-tight">
            {apT.pageTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {apT.pageSubtitle}
          </p>
        </div>

        {success ? (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-150 p-8 rounded-3xl flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto animate-fade-in shadow-md">
            <Check className="w-14 h-14 text-emerald-600 bg-white rounded-full p-3.5 shadow-sm border border-emerald-100" />
            <h3 className="font-sans font-black text-xl text-emerald-950">{apT.successTitle}</h3>
            <div className="text-xs sm:text-sm text-emerald-800 space-y-2 leading-relaxed">
              <p>
                {apT.successDetails} <strong className="text-emerald-950">{success.date} {apT.successAt} {success.time}</strong> {apT.successConcerning} &ldquo;<strong className="text-emerald-950">{success.serviceType}</strong>&rdquo; {apT.successCode} <strong className="text-emerald-950">{success.id}</strong>.
              </p>
              <p className="text-xs text-emerald-600">
                {apT.successConfirmation}
              </p>
            </div>
            <button
              onClick={() => setSuccess(null)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {apT.anotherBtn}
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto space-y-6">
            <h3 className="font-sans font-black text-lg sm:text-xl text-blue-950 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-900" />
              {apT.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 text-red-800 border border-red-150 rounded-xl flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase block">{apT.formName}</label>
                <input 
                  type="text"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder={apT.formNamePlaceholder}
                  className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block">{apT.formEmail}</label>
                  <input 
                    type="email"
                    name="clientEmail"
                    required
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder={apT.formEmailPlaceholder}
                    className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block">{apT.formPhone}</label>
                  <input 
                    type="text"
                    name="clientPhone"
                    required
                    value={formData.clientPhone}
                    onChange={handleChange}
                    placeholder={apT.formPhonePlaceholder}
                    className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase block">{apT.formService}</label>
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
                  <label className="text-xs font-bold text-gray-500 uppercase block">{apT.formDate}</label>
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
                  <label className="text-xs font-bold text-gray-500 uppercase block">{apT.formTime}</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                  >
                    {availableHours.map((hr) => (
                      <option key={hr} value={hr}>{hr} ({apT.timeLabel})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase block">{apT.formNotes}</label>
                <textarea 
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={apT.formNotesPlaceholder}
                  className="w-full px-4 py-3 bg-white border border-gray-250 focus:border-blue-900 rounded-xl text-sm outline-none transition-all shadow-sm"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? apT.submittingBtn : apT.submitBtn}
                </button>
              </div>

              <div className="flex items-center gap-1.5 justify-center text-[11px] text-gray-400 pt-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{apT.secureNote}</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
