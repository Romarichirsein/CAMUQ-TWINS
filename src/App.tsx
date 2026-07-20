import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";
import TestimonialsSection from "./components/TestimonialsSection";
import PartnersSection from "./components/PartnersSection";

// Modular Pages
import AboutUs from "./components/AboutUs";
import TrainingPage from "./components/TrainingPage";
import ServicesPage from "./components/ServicesPage";
import ProductsPage from "./components/ProductsPage";
import GalleryPage from "./components/GalleryPage";
import BlogPage from "./components/BlogPage";
import FaqPage from "./components/FaqPage";
import ContactPage from "./components/ContactPage";
import AppointmentPage from "./components/AppointmentPage";
import AdminDashboard from "./components/AdminDashboard";

// Widgets
import ChatBotWidget from "./components/ChatBotWidget";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "home" | "about" | "training" | "services" | "products" | "gallery" | "blog" | "faq" | "contact" | "appointment" | "admin"
  >("home");

  const [prefilledSubject, setPrefilledSubject] = useState("");

  const handleNavigate = (view: typeof currentView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Convert clicks on "Inscrire" or "Commander" into automatic navigation with prefilled subject/inputs
  const handleRegisterTraining = (trainingName: string) => {
    setPrefilledSubject(`Inscription à la Formation : ${trainingName}`);
    setCurrentView("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderProduct = (productName: string) => {
    setPrefilledSubject(`Achat de Produit : ${productName}`);
    setCurrentView("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuoteRequest = (serviceName: string) => {
    setPrefilledSubject(`Demande de Devis : ${serviceName}`);
    setCurrentView("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-900 selection:text-white font-sans antialiased text-gray-800">
      
      {/* Universal Sticky Header with Quick Contact Rail */}
      <Header onNavigate={handleNavigate} activeSection={currentView} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === "home" && (
          <div className="space-y-1 bg-white">
            {/* Immersive Hero Header */}
            <Hero onNavigate={handleNavigate} />
            
            {/* Quick interactive cost/devis estimator banner tabs */}
            <ServicesSection onQuoteRequest={handleQuoteRequest} />

            {/* Quick Promo banner leading to Formations */}
            <div className="py-16 bg-slate-900 text-white relative overflow-hidden border-y border-slate-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e3a8a,transparent)] opacity-40"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
                <span className="text-[10px] bg-yellow-400 text-blue-950 font-black px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                  Compétences d&apos;Avenir
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight max-w-2xl mx-auto">
                  Découvrez Notre Formation en Intelligence Artificielle & Bureautique
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Prenez une longueur d&apos;avance décisive. Apprenez à concevoir des visuels d&apos;exception avec l&apos;infographie ou à automatiser vos tâches bureautiques avec nos modules certifiés.
                </p>
                <div>
                  <button
                    onClick={() => handleNavigate("training")}
                    className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow cursor-pointer"
                  >
                    Découvrir nos Formations
                  </button>
                </div>
              </div>
            </div>

            {/* Partners section */}
            <PartnersSection />

            {/* Testimonials section */}
            <TestimonialsSection onLeaveFeedback={() => {
              setPrefilledSubject("Proposition de témoignage client");
              setCurrentView("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />
          </div>
        )}

        {currentView === "about" && <AboutUs />}

        {currentView === "training" && (
          <TrainingPage onRegister={handleRegisterTraining} />
        )}

        {currentView === "services" && (
          <ServicesPage onQuoteRequest={handleQuoteRequest} />
        )}

        {currentView === "products" && (
          <ProductsPage onOrderProduct={handleOrderProduct} />
        )}

        {currentView === "gallery" && <GalleryPage />}

        {currentView === "blog" && <BlogPage />}

        {currentView === "faq" && <FaqPage />}

        {currentView === "contact" && (
          <ContactPage prefilledSubject={prefilledSubject} />
        )}

        {currentView === "appointment" && <AppointmentPage />}

        {currentView === "admin" && <AdminDashboard />}
      </main>

      {/* Universal Footer with Brand description and Newsletter */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating AI Empire Chatbot Widget - Invisible on Admin Area to keep it professional */}
      {currentView !== "admin" && <ChatBotWidget />}

    </div>
  );
}
