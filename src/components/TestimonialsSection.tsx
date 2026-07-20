import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { TESTIMONIALS_DATA } from "../data";

interface TestimonialsSectionProps {
  onLeaveFeedback: () => void;
}

export default function TestimonialsSection({ onLeaveFeedback }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay function
  useEffect(() => {
    if (!isHovered) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const activeTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-100">
      {/* Decorative background grids/blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-45"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-3 py-1.5 rounded-full uppercase tracking-widest inline-block">
            Preuve Sociale & Confiance
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-blue-950 tracking-tight leading-tight">
            Ce que disent nos clients satisfaits
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Découvrez les retours d&apos;expérience des professionnels, étudiants et entrepreneurs qui font confiance à CAMUQ & TWINS EMPIRE.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Card */}
          <div className="min-h-[350px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-100/80 border border-slate-100/60 relative"
              >
                {/* Huge decorative quote icon */}
                <div className="absolute top-6 right-8 text-blue-100/70 pointer-events-none">
                  <Quote className="w-16 h-16 transform rotate-180" />
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  
                  {/* Left Column: Avatar & Stars */}
                  <div className="flex flex-col items-center shrink-0 text-center space-y-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
                        <img 
                          src={activeTestimonial.avatar} 
                          alt={activeTestimonial.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-900 text-white p-2 rounded-full shadow border-2 border-white">
                        <Quote className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-lg text-blue-950 leading-tight">
                        {activeTestimonial.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        {activeTestimonial.role}
                      </p>
                      <p className="text-xs text-blue-900 font-bold">
                        {activeTestimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Review Text & Rating */}
                  <div className="flex-grow flex flex-col justify-between space-y-6">
                    {/* Stars */}
                    <div className="flex items-center gap-1 justify-center md:justify-start">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < activeTestimonial.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-200"
                          }`} 
                        />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 italic leading-relaxed text-center md:text-left">
                      &ldquo;{activeTestimonial.content}&rdquo;
                    </p>

                    {/* Meta info badge */}
                    <div className="text-xs font-semibold text-gray-400 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Avis Client Vérifié • {activeTestimonial.company}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 sm:-px-4 md:-mx-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white hover:bg-slate-50 text-blue-950 hover:text-blue-900 shadow-md border border-slate-100 transition-all pointer-events-auto hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white hover:bg-slate-50 text-blue-950 hover:text-blue-900 shadow-md border border-slate-100 transition-all pointer-events-auto hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex ? "w-8 bg-blue-900" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic CTA to leave feedback */}
        <div className="mt-16 text-center max-w-xl mx-auto p-6 bg-blue-900/5 rounded-3xl border border-blue-900/10 space-y-4 animate-fade-in">
          <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm text-blue-900">
            <MessageSquareCode className="w-6 h-6" />
          </div>
          <h3 className="font-sans font-bold text-lg text-blue-950">
            Vous êtes un de nos clients ou partenaires ?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Votre avis compte énormément pour nous ! Partagez votre expérience et aidez-nous à continuer de parfaire nos services d&apos;exception.
          </p>
          <div>
            <button
              onClick={onLeaveFeedback}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow cursor-pointer"
            >
              Laisser un Témoignage
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
