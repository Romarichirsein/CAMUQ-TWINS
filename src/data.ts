import { ServiceItem, TrainingItem, ProductItem, BlogPost, GalleryItem, TestimonialItem, FaqItem } from "./types";

export const COMPANY_NAME = "CAMUQ & TWINS EMPIRE Ltd";
export const COMPANY_SLOGAN = "Building an empire without borders";
export const COMPANY_EMAIL = "camuq2002@gmail.com";
export const COMPANY_PHONES = ["+237 675 23 12 83", "+237 656 49 62 36"];

export const SERVICES_DATA: ServiceItem[] = [
  // IMPRESSION - 5 Sous-catégories
  {
    id: "imp-ind-1",
    name: "Impression Industrielle & Grands Tirages",
    category: "imprimerie",
    subCategory: "industrial",
    priceEstimate: "Sur devis",
    unit: "commande",
    baseCost: 0,
    hidePrice: true,
    description: "Tirages industriels haute capacité, impression de livres et magazines d'usine en gros volume...",
    icon: "Printer"
  },
  {
    id: "imp-com-1",
    name: "Flyers, Cartes de Visite & Dépliants",
    category: "imprimerie",
    subCategory: "communication",
    priceEstimate: "Sur devis",
    unit: "commande",
    baseCost: 0,
    hidePrice: true,
    description: "Supports de communication d'entreprise : flyers haute définition, cartes de visite de luxe et dépliants 2 ou 3 volets...",
    icon: "Layers"
  },
  {
    id: "imp-gf-1",
    name: "Banderoles, Roll-Up, Deuil & Anniversaires",
    category: "imprimerie",
    subCategory: "grand-format",
    priceEstimate: "Sur devis",
    unit: "commande",
    baseCost: 0,
    hidePrice: true,
    description: "Impression grand format sur bâches renforcées : banderoles publicitaires, roll-ups autoportants, affiches pour cérémonies de deuil et bâches d'anniversaire...",
    icon: "Flag"
  },
  {
    id: "imp-g-1",
    name: "Goodies, Tasses, Stylos & Porte-Clés",
    category: "imprimerie",
    subCategory: "goodies",
    priceEstimate: "Sur devis",
    unit: "commande",
    baseCost: 0,
    hidePrice: true,
    description: "Personnalisation d'objets publicitaires : tasses (mugs), stylos corporatifs gravés, porte-clés et gadgets de marque...",
    icon: "Coffee"
  },
  {
    id: "imp-text-1",
    name: "Marquage Textile : T-Shirts, Polos, Casquettes & Pagnes",
    category: "imprimerie",
    subCategory: "textile",
    priceEstimate: "Sur devis",
    unit: "commande",
    baseCost: 0,
    hidePrice: true,
    description: "Flocage, sérigraphie et broderie sur T-shirts corporatifs, polos d'entreprise, casquettes promotionnelles et pagnes événementiels...",
    icon: "Shirt"
  },

  // ÉDITIONS - Littérature Générale & Ouvrages Éducatifs
  {
    id: "ed-lit-roman",
    name: "Romans & Récits de Fiction",
    category: "edition",
    subCategory: "litterature",
    priceEstimate: "Sur devis",
    unit: "livre",
    baseCost: 0,
    hidePrice: true,
    description: "Édition, correction éditoriale, mise en page et impression haute définition de romans, récits littéraires et oeuvres de fiction...",
    icon: "BookOpen",
    coverImage: "/images/book_cover_novel.jpg",
    badge: "Roman & Fiction",
    features: ["Correction orthotypographique", "Mise en page Roman", "Pelliculage Mat/Brillant..."]
  },
  {
    id: "ed-lit-poetry",
    name: "Recueils de Poésie & Essais",
    category: "edition",
    subCategory: "litterature",
    priceEstimate: "Sur devis",
    unit: "livre",
    baseCost: 0,
    hidePrice: true,
    description: "Mise en page artistique, typographie soignée, correction et tirage de recueils de poésie, essais et écrits philosophiques...",
    icon: "Feather",
    coverImage: "/images/book_cover_poetry.jpg",
    badge: "Poésie & Essais",
    features: ["Typographie soignée", "Finition Luxe", "Reliure cousue/collée..."]
  },
  {
    id: "ed-lit-bio",
    name: "Autobiographies & Récits de Vie",
    category: "edition",
    subCategory: "litterature",
    priceEstimate: "Sur devis",
    unit: "livre",
    baseCost: 0,
    hidePrice: true,
    description: "Accompagnement éditorial bilingue, correction littéraire, mise en page et impression d'autobiographies et témoignages...",
    icon: "UserCheck",
    coverImage: "/images/flore-nouteli-foyett.jpg",
    badge: "Autobiographie",
    features: ["Retouche photo", "Mise en page personnalisée", "Tirage sur-mesure..."]
  },
  {
    id: "ed-lit-beaux-livres",
    name: "Beaux-Livres & Contes Illustrés",
    category: "edition",
    subCategory: "litterature",
    priceEstimate: "Sur devis",
    unit: "livre",
    baseCost: 0,
    hidePrice: true,
    description: "Édition grand format, illustration couleur HD et reliure de prestige pour beaux-livres, contes et albums d'art...",
    icon: "BookMarked",
    coverImage: "/images/book_cover_novel.jpg",
    badge: "Beaux-Livres & Contes",
    features: ["Grand Format A4/Carré", "Papier Couché 135g HD", "Couverture Rigide..."]
  },

  {
    id: "ed-edu-manuels",
    name: "Édition de Manuels Scolaires",
    category: "edition",
    subCategory: "education",
    priceEstimate: "Sur devis",
    unit: "manuel",
    baseCost: 0,
    hidePrice: true,
    description: "Conception, impression et édition de manuels scolaires conformes aux normes académiques et programmes officiels...",
    icon: "GraduationCap",
    coverImage: "/images/book_cover_textbook.jpg",
    badge: "Manuels Scolaires",
    features: ["Normes académiques", "Impression masse ou demande", "Reliure renforcée..."]
  },
  {
    id: "ed-edu-supports-pro",
    name: "Supports de Cours Professionnels",
    category: "edition",
    subCategory: "education",
    priceEstimate: "Sur devis",
    unit: "support",
    baseCost: 0,
    hidePrice: true,
    description: "Édition et impression de supports de cours professionnels, polycopiés universitaires et modules de formation continue...",
    icon: "Award",
    coverImage: "/images/book_cover_pro.jpg",
    badge: "Supports Professionnels",
    features: ["Brochures de cours", "Modules de formation", "Reliure spirale/thermo..."]
  },
  {
    id: "ed-edu-annales",
    name: "Cahiers d'Exercices, Annales & Brochures d'Examens...",
    category: "edition",
    subCategory: "education",
    priceEstimate: "Sur devis",
    unit: "livret",
    baseCost: 0,
    hidePrice: true,
    description: "Édition et impression de cahiers d'exercices, annales d'examens, brochures d'examens et guides pédagogiques...",
    icon: "FileCheck",
    coverImage: "/images/aprosac.jpg",
    badge: "Exercices & Examens",
    features: ["Cahiers de TD/TP", "Annales corrigées", "Guides pédagogiques..."]
  },

  // SECRÉTARIAT BUREAUTIQUE BILINGUE
  {
    id: "s-1",
    name: "Saisie Professionnelle Bilingue",
    category: "secretariat",
    priceEstimate: "Sur devis",
    unit: "page",
    baseCost: 0,
    hidePrice: true,
    description: "Saisie ultra-rapide et rigoureuse de rapports, correspondances administratives et documents de travail...",
    icon: "FileText"
  },
  {
    id: "s-2",
    name: "Impression & Photocopie Laser",
    category: "secretariat",
    priceEstimate: "Sur devis",
    unit: "page",
    baseCost: 0,
    hidePrice: true,
    description: "Impression laser haute fidélité en noir et blanc ou couleurs éclatantes sur papier de qualité supérieure...",
    icon: "Printer"
  },
  {
    id: "s-3",
    name: "Reliure & Numérisation (Scan)",
    category: "secretariat",
    priceEstimate: "Sur devis",
    unit: "document",
    baseCost: 0,
    hidePrice: true,
    description: "Reliure spirale ou thermique professionnelle, et numérisation (scan) haute vitesse vers formats PDF ou images...",
    icon: "FolderOpen"
  },
  {
    id: "s-4",
    name: "Plastification de Documents",
    category: "secretariat",
    priceEstimate: "Sur devis",
    unit: "document",
    baseCost: 0,
    hidePrice: true,
    description: "Protection de vos diplômes et documents d'importance contre l'humidité et l'usure grâce à notre plastification à chaud...",
    icon: "ShieldAlert"
  },

  // COMMERCE
  {
    id: "com-1",
    name: "Fournitures de Bureau & Papeterie Bilingue",
    category: "commerce",
    priceEstimate: "Sur devis",
    unit: "article",
    baseCost: 0,
    hidePrice: true,
    description: "Vente de fournitures de bureau, papier A4 Premium, registres, carnets et papeterie bilingue certifiée...",
    icon: "ShoppingBag"
  },
  {
    id: "com-2",
    name: "Gamme Longrich & Produits de Soins",
    category: "commerce",
    priceEstimate: "Sur devis",
    unit: "article",
    baseCost: 0,
    hidePrice: true,
    description: "Produits d'hygiène et de bien-être naturels Longrich (dentifrices, gobelets alcalins, soins corporels)...",
    icon: "Sparkles"
  },
  {
    id: "com-3",
    name: "Bijoux & Accessoires de Mode",
    category: "commerce",
    priceEstimate: "Sur devis",
    unit: "article",
    baseCost: 0,
    hidePrice: true,
    description: "Sélection raffinée de bijoux en argent, colliers élégants et accessoires de mode...",
    icon: "Gem"
  },

  // SERVICES EN LIGNE & DÉMARCHES ADMINISTRATIVES
  {
    id: "a-cni",
    name: "Pré-enrôlement CNI (Carte Nationale d'Identité)",
    category: "autres",
    priceEstimate: "Sur devis",
    unit: "démarche",
    baseCost: 0,
    hidePrice: true,
    description: "Assistance rapide, saisie des formulaires officiels et enregistrement du pré-enrôlement CNI en ligne...",
    icon: "CreditCard"
  },
  {
    id: "a-pass",
    name: "Pré-enrôlement Passeport Biométrique",
    category: "autres",
    priceEstimate: "Sur devis",
    unit: "démarche",
    baseCost: 0,
    hidePrice: true,
    description: "Prise en charge complète de la procédure de pré-enrôlement en ligne pour passeport biométrique, paiement des timbres et rendez-vous...",
    icon: "Globe"
  },
  {
    id: "a-docs",
    name: "Constitution de Dossiers Administratifs & Concours...",
    category: "autres",
    priceEstimate: "Sur devis",
    unit: "dossier",
    baseCost: 0,
    hidePrice: true,
    description: "Assistance pour la rédaction, vérification et constitution de dossiers de concours administratifs, timbres fiscaux, actes d'état civil et démarches publiques...",
    icon: "FileCheck"
  },
  {
    id: "a-1",
    name: "Cyber Café & Impression Internet",
    category: "autres",
    priceEstimate: "Sur devis",
    unit: "session",
    baseCost: 0,
    hidePrice: true,
    description: "Espace cyber connecté en fibre optique ultra-rapide pour toutes vos recherches, impressions et démarches Web...",
    icon: "Monitor"
  },
  {
    id: "a-2",
    name: "Mobile Money (MTN MoMo & Orange Money)",
    category: "autres",
    priceEstimate: "Sur devis",
    unit: "transaction",
    baseCost: 0,
    hidePrice: true,
    description: "Dépôts, retraits, transferts d'argent nationaux et internationaux instantanés en toute sécurité...",
    icon: "Smartphone"
  },
  {
    id: "a-3",
    name: "Abonnements & Recharges TV (Canal+)",
    category: "autres",
    priceEstimate: "Sur devis",
    unit: "recharge",
    baseCost: 0,
    hidePrice: true,
    description: "Recharges et réabonnements instantanés de vos bouquets Canal+ et autres opérateurs de télévision...",
    icon: "Tv"
  },

  // PERSONNALISÉ
  {
    id: "p-1",
    name: "Rédaction de CV & Lettres de Motivation",
    category: "personnalise",
    priceEstimate: "Sur devis",
    unit: "prestation",
    baseCost: 0,
    hidePrice: true,
    description: "Rédaction et valorisation de votre parcours professionnel avec une mise en page moderne, percutante et optimisée...",
    icon: "UserCheck"
  },
  {
    id: "p-2",
    name: "Correction & Mise en Forme de Rapports et Mémoires",
    category: "personnalise",
    priceEstimate: "Sur devis",
    unit: "travail",
    baseCost: 0,
    hidePrice: true,
    description: "Correction orthographique, relecture académique, structuration et mise en page de vos rapports de stage et mémoires...",
    icon: "CheckCircle"
  }
];

export const FORMATIONS_DATA: TrainingItem[] = [
  {
    id: "f-1",
    name: "Initiation à l'Intelligence Artificielle",
    duration: "1 Mois",
    level: "Intermédiaire",
    price: "Sur inscription",
    icon: "Brain",
    description: "Exploitez la puissance des modèles d'IA (ChatGPT, Midjourney, Claude) pour multiplier votre productivité.",
    longDescription: "Une formation révolutionnaire et inédite ! Apprenez à concevoir des prompts puissants, rédiger des rapports complexes en quelques secondes, générer des images commerciales d'exception et automatiser vos tâches bureautiques récurrentes.",
    image: "/images/formation-ia.jpg"
  },
  {
    id: "f-2",
    name: "Infographie & Graphic Design",
    duration: "3 Mois",
    level: "Intermédiaire",
    price: "Sur inscription",
    icon: "Palette",
    description: "Conception graphique professionnelle avec Adobe Photoshop, Illustrator et les bases de la typographie.",
    longDescription: "Apprenez à concevoir des visuels publicitaires, des chartes graphiques, des logos et des maquettes d'impression. Ce module intensif vous donne les clés pour intégrer une agence de communication ou exercer en freelance.",
    image: "/images/formation-infographie.jpg"
  },
  {
    id: "f-3",
    name: "Secrétariat & Bureautique Bilingue",
    duration: "2 Mois",
    level: "Intermédiaire",
    price: "Sur inscription",
    icon: "Briefcase",
    description: "Maîtrise complète de la suite Office : Microsoft Word, Excel avancé, PowerPoint et bilinguisme administratif.",
    longDescription: "Devenez un professionnel de l'administration. Ce cursus inclut la mise en page de documents complexes sous Word, le traitement et l'analyse de données sur tableurs Excel et la création de diaporamas percutants pour des réunions d'affaires.",
    image: "/images/formation-secretariat.jpg"
  },
  {
    id: "f-4",
    name: "Marketing Digital & Stratégie",
    duration: "2 Mois",
    level: "Expert",
    price: "Sur inscription",
    icon: "TrendingUp",
    description: "Apprenez à promouvoir vos produits, paramétrer des publicités Facebook/Google et animer une communauté.",
    longDescription: "Le marketing digital est le moteur de croissance moderne. Maîtrisez le SEO, le copywriting, la création d'audiences publicitaires, l'analyse des indicateurs clés (KPIs) et le community management sur Instagram, Facebook et TikTok.",
    image: "/images/formation-marketing.jpg"
  },
  {
    id: "f-5",
    name: "Montage Vidéo & Multi-média",
    duration: "2 Mois",
    level: "Intermédiaire",
    price: "Sur inscription",
    icon: "Video",
    description: "Maîtrisez le montage vidéo numérique, l'étalonnage, l'ajout d'effets visuels et de transitions sonores.",
    longDescription: "Créez des vidéos dynamiques pour YouTube, la télévision ou les réseaux sociaux. Apprenez à importer des rushes, couper, ajouter des transitions professionnelles, corriger les couleurs et intégrer des éléments de motion design.",
    image: "/images/banniere-nos-formations.jpg"
  },
  {
    id: "f-6",
    name: "Langues & Communication Pro",
    duration: "3 Mois",
    level: "Débutant",
    price: "Sur inscription",
    icon: "Languages",
    description: "Perfectionnement en Anglais, Chinois et Français pour communiquer efficacement avec vos partenaires.",
    longDescription: "Dans un monde interconnecté, le multilinguisme (Anglais, Chinois, Français) est un passeport vers la réussite. Pratiquez l'expression orale, la correspondance et apprenez le vocabulaire technique nécessaire pour échanger et négocier sereinement à l'international.",
    image: "/images/formation-langues.jpg"
  },
  {
    id: "f-7",
    name: "Initiation à l'Informatique",
    duration: "1 Mois",
    level: "Débutant",
    price: "Sur inscription",
    icon: "Monitor",
    description: "Prenez en main un ordinateur moderne : environnement Windows, navigation internet sécurisée, gestion des fichiers.",
    longDescription: "Ce module complet s'adresse à toute personne désireuse d'acquérir les bases de l'informatique. Vous apprendrez à manipuler le clavier, organiser vos dossiers, envoyer des emails professionnels et naviguer en toute sécurité.",
    image: "/images/formation-informatique.jpg"
  }
];

export const PRODUCT_DATA: ProductItem[] = [
  {
    id: "p-1",
    name: "Papeterie Bilingue & Bureau",
    category: "fourniture",
    price: 0,
    hidePrice: true,
    unit: "commande",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop",
    description: "Rames de papier A4 de marque Premium (Double A, Navigator), registres bilingues, cahiers, chemises cartonnées, classeurs et stylos professionnels.",
    available: true
  },
  {
    id: "p-2",
    name: "Dentifrice Longrich au thé blanc (Sans Fluor)",
    category: "longrich",
    price: 4000,
    unit: "tube 200g",
    image: "/images/dentifrice-longrich.jpg",
    description: "Pâte dentifrice au thé blanc sans fluor. Blanchit les dents, protège les gencives, élimine la mauvaise haleine, soulage la sensibilité dentaire et prévient les caries.",
    available: true
  },
  {
    id: "p-3",
    name: "Gobelet Alcalin de Santé Longrich",
    category: "longrich",
    price: 50000,
    unit: "gobelet",
    image: "/images/gobelet-alcalin-longrich.jpg",
    description: "Transforme l'eau en eau alcaline saine (2L/jour). Purifie l'organisme, favorise la digestion, abaisse la tension artérielle et réduit les risques d'AVC.",
    available: true
  },
  {
    id: "p-6",
    name: "Savon Noir au Charbon de Bambou Longrich",
    category: "longrich",
    price: 4000,
    unit: "boîte (3 savons)",
    image: "/images/savon-charbon-longrich.jpg",
    description: "Nettoyant et exfoliant efficace. Élimine les taches, points noirs, acné, excès de gras, boutons, dermatoses et prévient le vieillissement cutané.",
    available: true
  },
  {
    id: "p-7",
    name: "Lait de Corps SOD Longrich (Sheep Placenta)",
    category: "longrich",
    price: 6000,
    unit: "flacon 200ml",
    image: "/images/lait-sod-longrich.jpg",
    description: "Soin corporel hydratant à l'essence de placenta de brebis. Protège contre les irritations, unifie et illumine le teint pour une douceur intense.",
    available: true
  },
  {
    id: "p-8",
    name: "Spray Anti-Moustique Longrich",
    category: "longrich",
    price: 4500,
    unit: "flacon 175ml",
    image: "/images/spray-antimoustique-longrich.jpg",
    description: "Protection continue de 08 heures contre les piqûres de moustiques. Formule douce sans danger pour la peau, non irritante et perturbant la localisation des insectes.",
    available: true
  },
  {
    id: "p-9",
    name: "Huile de Serpent Longrich (Snake Oil)",
    category: "longrich",
    price: 7500,
    unit: "flacon 80ml",
    image: "/images/huile-de-serpent-longrich.jpg",
    description: "Hydrate la peau, traite vergetures, acnés, talons fendillés, pellicules, chute des cheveux, et calme les douleurs musculaires, rhumatismes et l'arthrite.",
    available: true
  },
  {
    id: "p-10",
    name: "Déodorant Anti-Transpirant Roll-On Longrich",
    category: "longrich",
    price: 3500,
    unit: "flacon 50ml",
    image: "/images/deodorant-longrich.jpg",
    description: "Supprime efficacement les mauvaises odeurs de transpiration, prévient les démangeaisons et procure une fraîcheur parfumée toute la journée.",
    available: true
  },
  {
    id: "p-5",
    name: "Calcium Longrich (Manganèse, Zinc)",
    category: "longrich",
    price: 12500,
    unit: "boîte 100 tab",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop",
    description: "Supplément nutritionnel de premier choix pour fortifier les os et les dents, idéal pour enfants et adultes.",
    available: true
  },
  {
    id: "p-4",
    name: "Bijoux et colliers en argent",
    category: "bijoux",
    price: 0,
    hidePrice: true,
    unit: "parure",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
    description: "Bijoux finement ciselés, parures de mariage et gourmettes élégantes en argent massif pour toutes vos cérémonies.",
    available: true
  }
];

export const VACATION_TRAINING_EVENT = {
  id: "vacances-utiles-2026",
  title: "Initiation à l'Informatique des Jeunes (9 à 17 ans)",
  subtitle: "VACANCES UTILES ÉDITION 2026 — CAMUQ AND TWINS TRAINING",
  dates: "Du 15 Juin au 13 Août 2026",
  duration: "Session Vacances Scolaires",
  targetAudience: "Enfants & Jeunes (9 à 17 ans)",
  location: "Campus de Nkolfoulou, Yaoundé",
  description: "Pour empêcher les enfants de s'ennuyer et de vagabonder durant les vacances scolaires, du 15 juin au 13 août 2026, CAMUQ AND TWINS TRAINING a initié les enfants de 9 à 17 ans à l'utilisation concrète et sécurisée de l'outil informatique.",
  highlights: [
    "Prise en main guidée des ordinateurs et saisie sur clavier",
    "Bases essentielles de la bureautique (Word, Excel, création de documents)",
    "Recherche éducative et sécurité sur Internet",
    "Remise solennelle d'attestations de réussite et valorisation des jeunes"
  ],
  images: [
    {
      url: "/images/formation-vacances-1.jpg",
      title: "Remise solennelle des attestations",
      caption: "Cérémonie de remise des attestations aux jeunes de la session Vacances Utiles avec la direction de CAMUQ AND TWINS TRAINING."
    },
    {
      url: "/images/formation-vacances-2.jpg",
      title: "Cours théorique & projection interactifs",
      caption: "Explications vivantes sur écran géant par la directrice pédagogique."
    },
    {
      url: "/images/formation-vacances-3.jpg",
      title: "Ateliers pratiques sur postes informatiques",
      caption: "Apprentissage individuel et pratique guidée sur les ordinateurs du centre."
    },
    {
      url: "/images/formation-vacances-4.jpg",
      title: "Immersion & concentration des jeunes",
      caption: "Session de travaux pratiques réunissant les jeunes motivés au campus de Nkolfoulou."
    }
  ]
};

export const FREE_TRAINING_EVENT = {
  id: "formation-gratuite-mars-avril-2026",
  title: "Formation Gratuite de 2 Mois Offerte aux Jeunes",
  subtitle: "Session Solidaire & Citoyenne (Mars - Avril 2026) — CAMUQ AND TWINS TRAINING",
  dates: "Mars - Avril 2026 (Durée : 2 Mois)",
  duration: "2 Mois gratuits",
  targetAudience: "Jeunes apprenants & passionnés du numérique",
  location: "Campus de Nkolfoulou, Yaoundé",
  description: "Organisée de mars à avril 2026, cette formation d'initiation 100% gratuite de 2 mois a permis aux jeunes de découvrir le monde informatique, de pratiquer sur ordinateur et d'acquérir les réflexes de base pour leur autonomie numérique.",
  noteAttestation: "Session d'initiation solidaire sans délivrance d'attestation.",
  highlights: [
    "Initiation pratique complète et gratuite de 2 mois à l'outil informatique",
    "Apprentissage des fonctions de base et manipulation du clavier / souris",
    "Initiation aux logiciels bureautiques essentiels",
    "Session 100% solidaire et citoyenne dispensée au campus de Nkolfoulou"
  ],
  videoUrl: "/videos/video-formation-vacances.mp4",
  videoPoster: "/images/banniere-nos-formations.jpg"
};

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g-vac-1",
    title: "Remise des attestations — Vacances Utiles",
    category: "formations",
    image: "/images/formation-vacances-1.jpg",
    description: "Cérémonie de remise solennelle des attestations de réussite aux jeunes de l'Édition Vacances Utiles (du 15 juin au 13 août 2026)."
  },
  {
    id: "g-vac-2",
    title: "Salle de cours & projection multimédia",
    category: "formations",
    image: "/images/formation-vacances-2.jpg",
    description: "Cours d'initiation informatique dispensé par la direction de CAMUQ AND TWINS TRAINING."
  },
  {
    id: "g-vac-3",
    title: "Ateliers pratiques sur ordinateur",
    category: "formations",
    image: "/images/formation-vacances-3.jpg",
    description: "Prise en main directe des outils informatiques par les jeunes apprenants."
  },
  {
    id: "g-vac-4",
    title: "Immersion & pratique en salle",
    category: "formations",
    image: "/images/formation-vacances-4.jpg",
    description: "Les jeunes en pleine session d'apprentissage pratique au centre de formation de Nkolfoulou."
  },
  {
    id: "g-1",
    title: "Atelier d'impression grand format",
    category: "imprimerie",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    description: "Notre traceur numérique de dernière génération produisant des banderoles publicitaires éclatantes."
  },
  {
    id: "g-2",
    title: "Classe de formation IA & Bureautique",
    category: "formations",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
    description: "Étudiants en pleine pratique d'ingénierie de prompts et d'automatisation des tâches administratives."
  },
  {
    id: "g-3",
    title: "Notre pôle secrétariat bilingue",
    category: "bureautique",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    description: "Espace moderne dédié à la mise en page de rapports d'études d'impact et de mémoires de thèses."
  },
  {
    id: "g-4",
    title: "T-shirts corporatifs personnalisés",
    category: "imprimerie",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    description: "Flocage de précision réalisé pour le compte d'une multinationale partenaire."
  },
  {
    id: "g-5",
    title: "Cyber Café moderne et rapide",
    category: "autres",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=600&auto=format&fit=crop",
    description: "Ordinateurs de pointe sous connexion fibre optique pour vos recherches et saisies administratives."
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: "b-vacances-2026",
    title: "Retour sur l'Édition Spéciale Vacances Utiles (15 Juin - 13 Août 2026)",
    summary: "Pendant les vacances scolaires, CAMUQ AND TWINS TRAINING a initié les jeunes de 9 à 17 ans à l'informatique avec remise solennelle d'attestations.",
    content: "Pour éviter l'ennui et le vagabondage des enfants durant les vacances scolaires, CAMUQ AND TWINS TRAINING a organisé du 15 juin au 13 août 2026 une session spéciale Vacances Utiles.\n\nAu programme : découverte guidée du matériel informatique, manipulation du clavier, création de documents sous Microsoft Word, initiation aux tableurs Excel et navigation éducative sur Internet. Cette belle session s'est terminée par une remise solennelle d'attestations de réussite et la valorisation des jeunes apprenants devant leurs familles.",
    image: "/images/formation-vacances-1.jpg",
    date: "Août 2026",
    author: "Direction CAMUQ AND TWINS TRAINING",
    category: "Formations",
    views: 342
  },
  {
    id: "b-1",
    title: "Comment l'IA révolutionne le secrétariat moderne au Cameroun",
    summary: "Découvrez comment l'intégration d'outils d'intelligence artificielle permet aux secrétaires de décupler leur efficacité.",
    content: "Dans un contexte de mondialisation accrue, les entreprises recherchent une agilité sans précédent. À Douala ou Yaoundé, la maîtrise des traitements de texte de base n'est plus suffisante. L'Intelligence Artificielle (IA) à travers des outils comme ChatGPT, Claude et Copilot permet de générer des brouillons de courriers, reformuler des rapports bilingues et automatiser des calendriers. Notre formation exclusive permet aux professionnels de prendre cette longueur d'avance essentielle.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    date: "14 Juillet 2026",
    author: "Directeur Académique",
    category: "Technologie",
    views: 124
  },
  {
    id: "b-2",
    title: "Guide complet du pré-enrôlement en ligne pour votre Passeport",
    summary: "Les étapes incontournables et les pièces à fournir pour préparer son dossier sans commettre d'erreur.",
    content: "Obtenir ou renouveler son passeport camerounais nécessite un processus rigoureux en ligne. Beaucoup font face à des rejets d'enrôlement dus à des erreurs de saisie ou des pièces justificatives non conformes. Ce guide récapitule les montants des timbres, les dimensions des photos requises, et comment notre espace Cyber Café vous assiste de bout en bout pour garantir une validation immédiate de votre dossier.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
    date: "10 Juillet 2026",
    author: "Consultant Administratif",
    category: "Démarches",
    views: 89
  },
  {
    id: "b-3",
    title: "Impact du design de vos supports sur la conversion client",
    summary: "Pourquoi investir dans un roll-up ou des flyers haut de gamme est la meilleure décision pour votre chiffre d'affaires.",
    content: "Votre image de marque est le premier contact avec votre prospect. Un flyer mal structuré ou une banderole pixélisée transmettent une image de manque de professionnalisme. L'impression sur des supports de qualité (papier couché, bâches denses) avec un design moderne augmente instantanément la perception de valeur de vos produits de 40%.",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    date: "01 Juillet 2026",
    author: "Responsable Marketing CAMUQ & TWINS EMPIRE",
    category: "Marketing",
    views: 215
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Franck Emmanuel",
    role: "Directeur de Projet",
    company: "SGC-Group",
    content: "L'impression de nos roll-up publicitaires et de nos brochures d'affaires a été effectuée dans un temps record de 24h. La finition est tout simplement impeccable et le service bilingue est d'un grand secours !",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "t-2",
    name: "Dr. Marie Noëlle",
    role: "Enseignante-Chercheuse",
    company: "Université de Yaoundé",
    content: "J'ai confié la saisie et la mise en page de ma thèse de doctorat à l'équipe secrétariat de CAMUQ & TWINS EMPIRE. Une rigueur chirurgicale dans la mise en forme et les références bilingues. Je les recommande vivement !",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "t-3",
    name: "Yannick Noah",
    role: "Entrepreneur Freelance",
    company: "Noah Digital Agency",
    content: "La formation en infographie et en intelligence artificielle m'a permis d'automatiser 70% de mes livrables pour mes clients internationaux. Cette formation vaut bien plus que son prix !",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "Où se situent vos bureaux ?",
    answer: "Nos bureaux principaux sont situés au Cameroun. Vous pouvez nous joindre pour tout projet d'envergure nationale ou internationale via nos numéros de téléphone (+237 675 23 12 83 / +237 656 49 62 36) ou par email.",
    category: "Général"
  },
  {
    id: "faq-2",
    question: "Comment puis-je m'inscrire à une formation ?",
    answer: "Vous pouvez vous inscrire directement en ligne via notre onglet 'Formations' ou via l'Assistant Virtuel IA. Vous pouvez également nous téléphoner ou passer dans nos bureaux pour un enregistrement physique.",
    category: "Formations"
  },
  {
    id: "faq-3",
    question: "Quels sont les délais de livraison pour les travaux d'imprimerie ?",
    answer: "Les petits travaux (flyers, t-shirts, mugs) sont généralement prêts en 24h à 48h. Pour les gros volumes d'éditions ou de banderoles grand format, les délais d'exécution s'étalent sur 3 à 5 jours ouvrés.",
    category: "Imprimerie"
  },
  {
    id: "faq-4",
    question: "Qu'est-ce que la formation Initiation à l'IA ?",
    answer: "C'est un module novateur d'un mois permettant d'apprendre à formuler des requêtes d'intelligence artificielle professionnelles, générer du texte, résumer des documents, et créer des logos/visuels grâce aux dernières technologies d'IA générative.",
    category: "Formations"
  },
  {
    id: "faq-5",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons les règlements en espèces dans nos bureaux, les paiements instantanés via MTN Mobile Money et Orange Money, ainsi que les virements bancaires pour les contrats d'entreprises.",
    category: "Général"
  }
];
