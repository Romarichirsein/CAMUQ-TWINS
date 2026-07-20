import React from "react";
import { 
  ShieldCheck, 
  Target, 
  Award, 
  Globe, 
  Landmark, 
  Calendar, 
  TrendingUp, 
  MapPin,
  Quote,
  Briefcase,
  Users,
  Lightbulb
} from "lucide-react";
import { COMPANY_NAME, COMPANY_SLOGAN } from "../data";
import PartnersSection from "./PartnersSection";

export default function AboutUs() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Chaque prestation fait l'objet d'un contrôle rigoureux pour vous offrir un résultat de niveau supérieur."
    },
    {
      icon: Briefcase,
      title: "Professionnalisme",
      description: "Une équipe qualifiée, bilingue et engagée à vos côtés avec rigueur, respect des délais et des standards."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Nous modernisons nos méthodes de travail grâce à l'informatique avancée et l'intégration stratégique de l'IA."
    },
    {
      icon: ShieldCheck,
      title: "Intégrité",
      description: "Honnêteté, transparence absolue et confidentialité totale de vos données et documents sensibles."
    },
    {
      icon: Target,
      title: "Satisfaction Client",
      description: "Votre réussite est notre priorité absolue. Nous façonnons nos solutions pour répondre à vos attentes exactes."
    }
  ];

  return (
    <div id="about-us-view" className="bg-slate-50 min-h-screen pb-20 animate-fade-in font-sans">
      
      {/* Hero Banner Section */}
      <div className="relative bg-blue-950 text-white py-24 overflow-hidden border-b border-yellow-500/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#1e3b8b,transparent)] opacity-60"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <span className="text-[10px] bg-yellow-400 text-blue-950 font-black px-3 py-1.5 rounded-full uppercase tracking-widest inline-block">
            Bâtir un Empire Sans Frontières
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight max-w-4xl mx-auto">
            À Propos de Nous & Notre Histoire
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez le parcours de <span className="text-yellow-400 font-bold">CAMUQ AND TWINS EMPIRE Ltd</span>, ses valeurs fondamentales, son engagement d'excellence et son équipe dirigeante engagée.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        
        {/* SECTION 1: Notre Histoire / À Propos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Narrative text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-yellow-400 pl-4">
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-blue-950 tracking-tight">
                Notre Histoire
              </h2>
              <p className="text-xs text-yellow-600 font-extrabold uppercase tracking-widest mt-1">
                Un parcours marqué par l'excellence et la croissance
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              L'histoire de <strong>CAMUQ AND TWINS EMPIRE Ltd</strong> est celle d'une entreprise portée par une ambition claire : proposer des solutions professionnelles innovantes tout en contribuant au développement des compétences, à l'entrepreneuriat et à l'autonomisation des populations.
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Tout commence en <strong>août 2021</strong>, avec la création de <strong>CAMUQ TRADING HOUSE</strong>, entreprise individuelle soumise à l'impôt libératoire. Dès ses débuts, elle se spécialise dans le secrétariat bureautique, la commercialisation de fournitures scolaires et de matériel de bureau, ainsi que dans la formation à l'initiation à l'informatique destinée aux jeunes et aux femmes. Portée par une équipe de deux employés, elle se fait rapidement remarquer pour son professionnalisme, sa proximité avec la clientèle et la qualité de ses prestations.
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Convaincue que la croissance durable passe par l'innovation et la collaboration, la promotrice franchit une nouvelle étape en <strong>2025</strong> en ouvrant le capital de l'entreprise à deux nouveaux associés. Cette évolution stratégique, marquée par la cession de 50 % des parts sociales, donne naissance à <strong>CAMUQ AND TWINS EMPIRE Ltd</strong> — une entreprise renforcée, portée par une vision élargie et de nouvelles ambitions.
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Aujourd'hui installée à <strong>Nkolfoulou</strong>, CAMUQ AND TWINS EMPIRE Ltd intervient sur plusieurs secteurs complémentaires : prestations de services, formation professionnelle, édition, services bureautiques et solutions sur mesure destinées aux particuliers, entreprises, administrations et organisations.
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              La création de ce site web s'inscrit pleinement dans cette dynamique de croissance. Il vise à rapprocher l'entreprise de ses clients et partenaires, à faire connaître son expertise, à présenter l'étendue de ses services et à renforcer la confiance de toutes les parties prenantes.
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Guidée par les valeurs d'excellence, de professionnalisme, d'innovation, d'intégrité et de satisfaction client, CAMUQ AND TWINS EMPIRE Ltd poursuit son ambition de devenir une référence africaine et un partenaire de confiance pour tous ceux qui recherchent des solutions efficaces, durables et adaptées à leurs besoins.
            </p>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-bold text-blue-950 italic">
              Plus qu'une entreprise, CAMUQ AND TWINS EMPIRE Ltd se veut un partenaire engagé dans la création de valeur, le développement des compétences et la promotion de l'excellence au service du progrès.
            </p>
          </div>

          {/* Right Block: Visual Roadmap card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-lg space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full pointer-events-none"></div>
              
              <h3 className="font-sans font-black text-lg text-blue-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                Repères Chronologiques
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {/* 2021 */}
                <div className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs relative z-10 shrink-0 shadow">
                    21
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-blue-950">Août 2021 : Fondation</h4>
                    <p className="text-xs text-gray-500 mt-1">Lancement de CAMUQ TRADING HOUSE. Spécialisation en secrétariat, fournitures de bureau et initiation informatique bilingue.</p>
                  </div>
                </div>

                {/* 2025 */}
                <div className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-blue-950 flex items-center justify-center font-bold text-xs relative z-10 shrink-0 shadow">
                    25
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-blue-950">2025 : Extension & Capital</h4>
                    <p className="text-xs text-gray-500 mt-1">Arrivée de deux nouveaux associés, cession de 50 % des parts sociales et création de CAMUQ AND TWINS EMPIRE Ltd.</p>
                  </div>
                </div>

                {/* Today */}
                <div className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs relative z-10 shrink-0 shadow">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-blue-950">Aujourd'hui : Rayonnement</h4>
                    <p className="text-xs text-gray-500 mt-1">Installation à Nkolfoulou. Leader local multidirectionnel (Services, Édition, Formations Certifiantes et Commerce).</p>
                  </div>
                </div>
              </div>

              {/* Geographic badge */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-900 shrink-0" />
                <div>
                  <span className="text-[10px] text-blue-800 uppercase font-bold tracking-widest block">Notre Siège Social</span>
                  <span className="text-xs text-slate-700 font-bold">Nkolfoulou, Cameroun</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 2: Mot de la Directrice Générale */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#e5a823,transparent)] opacity-15 pointer-events-none"></div>
          <div className="absolute top-10 right-10 text-white/5 pointer-events-none">
            <Quote className="w-32 h-32 transform rotate-180" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Block: Image cropped below elbows, black background */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group">
                {/* Black solid background wrapper */}
                <div className="absolute inset-0 bg-black rounded-3xl -rotate-2 transform scale-102 group-hover:rotate-0 transition-transform duration-300"></div>
                <div className="relative w-64 h-80 rounded-3xl overflow-hidden bg-black border-2 border-yellow-400 shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800" 
                    alt="Mme Flore NOUTELI FOYETT, Directrice Générale" 
                    className="w-full h-full object-cover object-top opacity-90 contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Mask or subtle shadow cropped look to look polished */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-yellow-400 font-bold block text-sm tracking-wide">Mme Flore NOUTELI-FOYETT</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold block mt-0.5">Directrice Générale</span>
              </div>
            </div>

            {/* Right Block: Message text */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] bg-yellow-400 text-blue-950 font-black px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                  Éditorial
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-white mt-2">
                  Mot de la Directrice Générale
                </h3>
              </div>

              <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-light italic">
                <p>
                  &ldquo; Bienvenue sur le site officiel de CAMUQ AND TWINS EMPIRE Ltd.
                </p>
                <p>
                  C'est avec un immense plaisir que je vous accueille sur cette plateforme, conçue pour vous faire découvrir notre entreprise, nos activités, nos réalisations et les valeurs qui nous animent au quotidien.
                </p>
                <p>
                  Depuis la création de notre entreprise en 2021, notre ambition est restée la même : offrir des services de qualité, accompagner le développement des compétences et proposer des solutions adaptées aux besoins des particuliers, des entreprises et des institutions.
                </p>
                <p>
                  Au fil des années, grâce à la confiance de nos clients, à l'engagement de notre équipe et à l'arrivée de nouveaux associés partageant notre vision, CAMUQ AND TWINS EMPIRE Ltd s'est développée et a diversifié ses domaines d'intervention. Aujourd'hui, nous sommes fiers d'évoluer dans les prestations de services, la formation professionnelle, les éditions et plusieurs autres activités contribuant au développement économique et social.
                </p>
                <p>
                  Notre engagement repose sur des valeurs fortes : l'excellence, l'intégrité, l'innovation, le professionnalisme et la satisfaction de nos clients. Ces principes guident chacune de nos actions et nous motivent à améliorer continuellement la qualité de nos services.
                </p>
                <p>
                  À travers ce site, nous souhaitons renforcer notre proximité avec vous, faciliter nos échanges, présenter nos offres et construire des partenariats solides fondés sur la confiance et la performance.
                </p>
                <p>
                  Je tiens à remercier chaleureusement nos clients, nos partenaires, nos collaborateurs et toutes les personnes qui nous accompagnent depuis le début de cette belle aventure. Votre confiance est notre plus grande motivation.
                </p>
                <p>
                  Je vous invite à parcourir notre site et à découvrir l'univers de CAMUQ AND TWINS EMPIRE Ltd. Nous serons honorés de vous compter parmi nos partenaires et de contribuer à la réussite de vos projets.
                </p>
                <p>
                  Au plaisir de collaborer avec vous. &rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400">Signature officielle</p>
                  <p className="font-sans font-black text-yellow-400 text-lg tracking-wide">Flore NOUTELI-FOYETT</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Directrice Générale</p>
                </div>
                <div className="text-slate-400 text-xs sm:text-right">
                  <p className="font-bold text-white">CAMUQ AND TWINS EMPIRE Ltd</p>
                  <p>Nkolfoulou, Cameroun</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 3: Notre Équipe Dirigeante with Photos */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-3 py-1.5 rounded-full uppercase tracking-widest inline-block">
              Notre Équipe Dirigeante
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-blue-950 tracking-tight">
              Bâtisseurs d'un Empire sans Frontières
            </h3>
            <p className="text-xs sm:text-sm text-yellow-600 font-extrabold uppercase tracking-widest italic">
              « Build an Empire Without Borders »
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Portée par le slogan « Build an Empire Without Borders », CAMUQ AND TWINS EMPIRE Ltd s'appuie sur une équipe dirigeante expérimentée et visionnaire. Conduite par une Directrice Générale forte de plus de 15 années d'expérience en gestion d'entreprises, aux côtés d'un Directeur des Opérations et d'un Directeur Commercial et Marketing, notre équipe met son expertise, son leadership et son engagement au service de l'innovation, de la performance et d'une croissance durable.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
              Ensemble, nous travaillons chaque jour à bâtir un empire sans frontières, fondé sur l'excellence, la confiance et la création de valeur pour nos clients, partenaires et communautés.
            </p>
          </div>

          {/* Org Chart Portrait Layout */}
          {/* Requested Layout: DG at the top center. Below her: DCM to her right (left of screen), DO to her left (right of screen) */}
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
            
            {/* Level 1: DG (Top Center) */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-3xl border border-yellow-400 shadow-xl max-w-xs text-center space-y-4 transform transition-transform hover:scale-105">
                {/* Photo cropped below elbow with black background as requested */}
                <div className="w-56 h-72 rounded-2xl overflow-hidden bg-black relative border border-slate-900 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800" 
                    alt="Mme Flore NOUTELI FOYETT" 
                    className="w-full h-full object-cover object-top opacity-90 contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle elegant border */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-center">
                    <span className="text-[9px] bg-yellow-400 text-blue-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                      DG - Promotrice
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-blue-950 leading-tight">Mme Flore NOUTELI-FOYETT</h4>
                  <p className="text-xs font-semibold text-yellow-600">Directrice Générale</p>
                  <p className="text-[10px] text-gray-400 pt-1 border-t border-slate-100">Plus de 15 ans d'expérience en gestion d'entreprises</p>
                </div>
              </div>
            </div>

            {/* Connecting lines or arrows wrapper */}
            <div className="hidden md:flex flex-col items-center -my-6">
              <div className="h-8 w-[2px] bg-yellow-400"></div>
              <div className="w-[300px] h-[2px] bg-yellow-400"></div>
              <div className="flex justify-between w-[300px] h-6">
                <div className="w-[2px] h-full bg-yellow-400"></div>
                <div className="w-[2px] h-full bg-yellow-400"></div>
              </div>
            </div>

            {/* Level 2: DCM to her right (left on screen) & DO to her left (right on screen) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
              
              {/* DCM (Directeur Commercial et Marketing) - on her right (left of screen) */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-3xl border border-slate-150 shadow-lg w-full max-w-xs text-center space-y-4 transform transition-transform hover:scale-105">
                  <div className="w-52 h-64 rounded-2xl overflow-hidden bg-slate-100 relative mx-auto border border-slate-150">
                    <img 
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500&h=700" 
                      alt="Directeur Commercial et Marketing" 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-center">
                      <span className="text-[9px] bg-blue-900 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                        DCM
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-blue-950 leading-tight">DCM</h4>
                    <p className="text-xs font-semibold text-blue-900">Directeur Commercial & Marketing</p>
                    <p className="text-[10px] text-gray-400 pt-1 border-t border-slate-100">Stratégie d'acquisition, partenariats & rayonnement</p>
                  </div>
                </div>
              </div>

              {/* DO (Directeur des Opérations) - on her left (right of screen) */}
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-3xl border border-slate-150 shadow-lg w-full max-w-xs text-center space-y-4 transform transition-transform hover:scale-105">
                  <div className="w-52 h-64 rounded-2xl overflow-hidden bg-slate-100 relative mx-auto border border-slate-150">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500&h=700" 
                      alt="Directeur des Opérations" 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-center">
                      <span className="text-[9px] bg-blue-900 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                        DO
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-blue-950 leading-tight">DO</h4>
                    <p className="text-xs font-semibold text-blue-900">Directeur des Opérations</p>
                    <p className="text-[10px] text-gray-400 pt-1 border-t border-slate-100">Coordination des services, formations & logistique</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 4: Our Corporate Values */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-blue-950 tracking-tight">
              Nos Valeurs Cardinales
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Cinq principes fondamentaux qui guident chacune de nos actions et motivent nos collaborateurs à exceller au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-100 hover:bg-blue-50/15 hover:border-blue-200 hover:shadow-lg transition-all duration-300 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 border border-blue-100/50 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-blue-950">{val.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: Nos Partenaires */}
        <div className="pt-8">
          <PartnersSection />
        </div>

      </div>
    </div>
  );
}
