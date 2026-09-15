import React, { useState, useMemo } from "react";
import { 
  Calendar, 
  MapPin, 
  Target, 
  FileText, 
  Camera, 
  Search, 
  X, 
  ArrowRight, 
  Clock, 
  Users, 
  Quote, 
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Share2
} from "lucide-react";
import { EVENTS_DATA, COMPANY_PHONES } from "../data";
import { EventItem } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface EventsPageProps {
  onRegister?: (eventName: string) => void;
}

export default function EventsPage({ onRegister }: EventsPageProps) {
  const { t } = useLanguage();
  const evT = t.events;

  const [activeStatus, setActiveStatus] = useState<"all" | "upcoming" | "ongoing" | "past">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: EVENTS_DATA.length,
      upcoming: EVENTS_DATA.filter((e) => e.status === "upcoming").length,
      ongoing: EVENTS_DATA.filter((e) => e.status === "ongoing").length,
      past: EVENTS_DATA.filter((e) => e.status === "past").length,
    };
  }, []);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((item) => {
      const matchStatus = activeStatus === "all" || item.status === activeStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [activeStatus, searchQuery]);

  const handleWhatsAppInquiry = (eventTitle: string) => {
    const rawPhone = COMPANY_PHONES[0].replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Bonjour CAMUQ & TWINS EMPIRE, je souhaite avoir plus d'informations concernant l'activité : "${eventTitle}".`
    );
    window.open(`https://wa.me/${rawPhone}?text=${msg}`, "_blank");
  };

  const getStatusBadge = (status: EventItem["status"]) => {
    switch (status) {
      case "upcoming":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          dot: "bg-amber-500",
          label: evT.filterUpcoming
        };
      case "ongoing":
        return {
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          dot: "bg-emerald-500 animate-pulse",
          label: evT.filterOngoing
        };
      case "past":
      default:
        return {
          bg: "bg-slate-100 text-slate-800 border-slate-300",
          dot: "bg-slate-400",
          label: evT.filterPast
        };
    }
  };

  return (
    <div id="events-view" className="py-16 bg-slate-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-950 bg-yellow-400 px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{evT.pageTag}</span>
          </div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-blue-950 tracking-tight leading-tight">
            {evT.pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {evT.pageSubtitle}
          </p>

          {/* Guidelines Sub-Banner: Fiche Méthode */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white px-5 py-2.5 rounded-2xl border border-gray-200 shadow-xs text-xs font-bold text-gray-700">
              <span className="flex items-center gap-1 text-blue-900">
                <Calendar className="w-3.5 h-3.5 text-yellow-500" /> {evT.dateLabel}
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1 text-blue-900">
                <MapPin className="w-3.5 h-3.5 text-yellow-500" /> {evT.locationLabel}
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1 text-blue-900">
                <Target className="w-3.5 h-3.5 text-yellow-500" /> {evT.activityLabel}
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1 text-blue-900">
                <FileText className="w-3.5 h-3.5 text-yellow-500" /> {evT.summaryLabel}
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1 text-blue-900">
                <Camera className="w-3.5 h-3.5 text-yellow-500" /> {evT.photoLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Control Bar: Filters & Search */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveStatus("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeStatus === "all"
                  ? "bg-blue-950 text-white shadow-md shadow-blue-950/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {evT.filterAll} ({counts.all})
            </button>

            <button
              onClick={() => setActiveStatus("upcoming")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStatus === "upcoming"
                  ? "bg-amber-500 text-blue-950 font-black shadow-md shadow-amber-500/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              {evT.filterUpcoming} ({counts.upcoming})
            </button>

            <button
              onClick={() => setActiveStatus("ongoing")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStatus === "ongoing"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              {evT.filterOngoing} ({counts.ongoing})
            </button>

            <button
              onClick={() => setActiveStatus("past")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStatus === "past"
                  ? "bg-slate-700 text-white shadow-md shadow-slate-700/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              {evT.filterPast} ({counts.past})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={evT.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent bg-slate-50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-700">{evT.noResults}</h3>
            <button
              onClick={() => {
                setActiveStatus("all");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-950 transition-colors"
            >
              {evT.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((event) => {
              const statusBadge = getStatusBadge(event.status);

              return (
                <article
                  key={event.id}
                  className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Visual Header / Photo */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-xs ${statusBadge.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`}></span>
                        {event.badge || statusBadge.label}
                      </span>

                      {event.priceBadge && (
                        <span className="text-[11px] font-black uppercase tracking-wider bg-yellow-400 text-blue-950 px-3 py-1 rounded-full shadow-xs border border-yellow-300">
                          {event.priceBadge}
                        </span>
                      )}
                    </div>

                    {/* Bottom Floating Title Info */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-yellow-300 mb-1 bg-blue-950/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-yellow-400/30">
                        {event.category}
                      </span>
                      <h3 className="font-sans font-black text-lg sm:text-xl leading-snug drop-shadow-md">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Fiche Structurée (Date, Lieu, Activité, Résumé, Photos) */}
                  <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between space-y-6">
                    
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 border-b border-gray-100 text-xs">
                      {/* 📅 Date */}
                      <div className="flex items-start gap-2.5 text-gray-700">
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-900 shrink-0">
                          <Calendar className="w-4 h-4 text-blue-900" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            {evT.dateLabel}
                          </p>
                          <p className="font-bold text-blue-950">
                            {event.date}
                          </p>
                          {event.time && (
                            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-yellow-600" /> {event.time}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 📍 Lieu */}
                      <div className="flex items-start gap-2.5 text-gray-700">
                        <div className="p-2 rounded-xl bg-yellow-50 text-yellow-700 shrink-0">
                          <MapPin className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            {evT.locationLabel}
                          </p>
                          <p className="font-bold text-gray-800">
                            {event.location}
                          </p>
                        </div>
                      </div>

                      {/* 🎯 Activité */}
                      <div className="flex items-start gap-2.5 text-gray-700">
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 shrink-0">
                          <Target className="w-4 h-4 text-emerald-700" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            {evT.activityLabel}
                          </p>
                          <p className="font-bold text-gray-800">
                            {event.category}
                          </p>
                        </div>
                      </div>

                      {/* 👥 Public Cible */}
                      {event.targetAudience && (
                        <div className="flex items-start gap-2.5 text-gray-700">
                          <div className="p-2 rounded-xl bg-purple-50 text-purple-800 shrink-0">
                            <Users className="w-4 h-4 text-purple-700" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                              {evT.audienceLabel}
                            </p>
                            <p className="font-bold text-gray-800 line-clamp-1">
                              {event.targetAudience}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 📝 Résumé & Citation */}
                    <div className="space-y-3 flex-grow">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {event.summary}
                      </p>

                      {/* Encart Citation Signature */}
                      {event.quote && (
                        <div className="bg-amber-50/70 border-l-3 border-yellow-400 p-3.5 rounded-r-2xl relative">
                          <Quote className="w-4 h-4 text-yellow-600 mb-1" />
                          <p className="text-xs text-blue-950 font-semibold italic leading-relaxed">
                            &ldquo;{event.quote}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-yellow-400" />
                        <span>{evT.detailsBtn}</span>
                      </button>

                      {event.status === "upcoming" || event.status === "ongoing" ? (
                        <button
                          onClick={() => {
                            if (onRegister) {
                              onRegister(event.title);
                            }
                          }}
                          className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        >
                          <span>{evT.registerBtn}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleWhatsAppInquiry(event.title)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{evT.whatsappBtn}</span>
                        </button>
                      )}
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Interactive Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full bg-slate-900">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest bg-yellow-400 text-blue-950 px-3 py-1 rounded-full">
                  {selectedEvent.category}
                </span>
                <h2 className="font-sans font-black text-xl sm:text-3xl leading-tight">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Structured Metadata Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-blue-900" />
                  <span>{evT.dateLabel} : <strong>{selectedEvent.date}</strong></span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  <span>{evT.locationLabel} : <strong>{selectedEvent.location}</strong></span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center gap-2 font-semibold text-gray-700">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Horaires : <strong>{selectedEvent.time}</strong></span>
                  </div>
                )}
                {selectedEvent.targetAudience && (
                  <div className="flex items-center gap-2 font-semibold text-gray-700">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>{evT.audienceLabel} : <strong>{selectedEvent.targetAudience}</strong></span>
                  </div>
                )}
              </div>

              {/* Quote if present */}
              {selectedEvent.quote && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-2xl">
                  <p className="text-[11px] font-black uppercase tracking-widest text-yellow-800 mb-1">
                    {evT.quoteTitle}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-blue-950 italic leading-relaxed">
                    &ldquo;{selectedEvent.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* Program & Full Description */}
              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-blue-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-500" />
                  {evT.programTitle}
                </h4>
                <div className="space-y-2.5 text-sm text-gray-700 leading-relaxed">
                  {selectedEvent.description.map((paragraph, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                      <p>{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  {evT.closeModal}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWhatsAppInquiry(selectedEvent.title)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  {(selectedEvent.status === "upcoming" || selectedEvent.status === "ongoing") && onRegister && (
                    <button
                      onClick={() => {
                        const title = selectedEvent.title;
                        setSelectedEvent(null);
                        onRegister(title);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <span>{evT.registerBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
