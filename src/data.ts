import { ServiceItem, TrainingItem, ProductItem, BlogPost, GalleryItem, TestimonialItem, FaqItem } from "./types";

export const COMPANY_NAME = "CAMUQ AND TWINS EMPIRE Ltd";
export const COMPANY_SLOGAN = "Building an empire without borders";
export const COMPANY_EMAIL = "camuq2002@gmail.com";
export const COMPANY_PHONES = ["+237 675 23 12 83", "+237 656 49 62 36"];

export const SERVICES_DATA: ServiceItem[] = [
  // Secrétariat
  {
    id: "s-1",
    name: "Saisie Professionnelle",
    category: "secretariat",
    priceEstimate: "500 FCFA / page",
    unit: "page",
    baseCost: 500,
    description: "Saisie ultra-rapide et rigoureuse de rapports, mémoires de fin d'études et correspondances administratives.",
    icon: "FileText"
  },
  {
    id: "s-2",
    name: "Impression & Photocopie Laser",
    category: "secretariat",
    priceEstimate: "100 FCFA / page",
    unit: "page",
    baseCost: 100,
    description: "Impression laser haute fidélité en noir et blanc ou en couleurs éclatantes sur papier de qualité supérieure.",
    icon: "Printer"
  },
  {
    id: "s-3",
    name: "Reliure & Numérisation",
    category: "secretariat",
    priceEstimate: "1 500 FCFA / document",
    unit: "document",
    baseCost: 1500,
    description: "Reliure spirale ou thermique professionnelle, et numérisation (scan) haute vitesse vers formats PDF ou images.",
    icon: "FolderOpen"
  },
  {
    id: "s-4",
    name: "Rédaction de CV Moderne",
    category: "secretariat",
    priceEstimate: "3 000 FCFA / CV",
    unit: "CV",
    baseCost: 3000,
    description: "Valorisation de votre parcours professionnel avec une mise en page moderne, percutante et optimisée ATS.",
    icon: "UserCheck"
  },
  {
    id: "s-5",
    name: "Plastification de Documents",
    category: "secretariat",
    priceEstimate: "1 000 FCFA / doc",
    unit: "document",
    baseCost: 1000,
    description: "Protection de vos diplômes et documents d'importance contre l'humidité et l'usure grâce à notre plastification à chaud.",
    icon: "ShieldAlert"
  },

  // Imprimerie
  {
    id: "i-1",
    name: "Banderoles & Banners",
    category: "imprimerie",
    priceEstimate: "6 000 FCFA / m²",
    unit: "m²",
    baseCost: 6000,
    description: "Impression grand format sur bâche résistante aux intempéries pour vos campagnes promotionnelles ou événements.",
    icon: "Flag"
  },
  {
    id: "i-2",
    name: "Roll-up Publicitaires",
    category: "imprimerie",
    priceEstimate: "35 000 FCFA / kit",
    unit: "kit complet",
    baseCost: 35000,
    description: "Supports autoportants parfaits pour les salons d'exposition, présentations d'entreprises ou points de vente.",
    icon: "Image"
  },
  {
    id: "i-3",
    name: "Flyers & Dépliants",
    category: "imprimerie",
    priceEstimate: "15 000 FCFA / 100 pcs",
    unit: "100 pièces",
    baseCost: 150,
    description: "Conception graphique et tirage de flyers haute définition pour capter l'attention de vos prospects.",
    icon: "Layers"
  },
  {
    id: "i-4",
    name: "Mugs & Stylos Personnalisés",
    category: "imprimerie",
    priceEstimate: "3 500 FCFA / pièce",
    unit: "unité",
    baseCost: 3500,
    description: "Personnalisation d'objets publicitaires de haute qualité pour renforcer la fidélité de vos clients et votre marque.",
    icon: "Coffee"
  },
  {
    id: "i-5",
    name: "T-Shirts & Casquettes Floqués",
    category: "imprimerie",
    priceEstimate: "5 500 FCFA / pièce",
    unit: "unité",
    baseCost: 5500,
    description: "Flocage, sérigraphie ou sublimation professionnelle sur textiles de grande durabilité.",
    icon: "Shirt"
  },

  // Autres Services (Cyber, Admin, Mobile Money, Canal+)
  {
    id: "a-1",
    name: "Cyber Café & Photo Minute",
    category: "autres",
    priceEstimate: "500 FCFA / session",
    unit: "session",
    baseCost: 500,
    description: "Connexion internet ultra-rapide par fibre optique et service de photo d'identité minute aux normes internationales.",
    icon: "Camera"
  },
  {
    id: "a-2",
    name: "MTN MoMo & Orange Money",
    category: "autres",
    priceEstimate: "Selon grille",
    unit: "transaction",
    baseCost: 0,
    description: "Dépôts, retraits et transferts d'argent instantanés et sécurisés au sein des deux principaux réseaux.",
    icon: "Smartphone"
  },
  {
    id: "a-3",
    name: "Pré-enrôlement CNI & Passeport",
    category: "autres",
    priceEstimate: "1 500 FCFA / demande",
    unit: "demande",
    baseCost: 1500,
    description: "Assistance et saisie complète de vos formulaires administratifs pour l'obtention de passeport ou carte d'identité.",
    icon: "FileCheck"
  },
  {
    id: "a-4",
    name: "Abonnement Canal+",
    category: "autres",
    priceEstimate: "Selon bouquet",
    unit: "mois",
    baseCost: 0,
    description: "Activation de vos bouquets Canal+, changement de formule et paiements de factures simplifiés.",
    icon: "Tv"
  },
  {
    id: "a-5",
    name: "Paiement de Factures en ligne",
    category: "autres",
    priceEstimate: "500 FCFA / facture",
    unit: "facture",
    baseCost: 500,
    description: "Règlement sécurisé de vos factures d'électricité Eneo, factures d'eau Camwater et autres services numériques.",
    icon: "Receipt"
  }
];

export const FORMATIONS_DATA: TrainingItem[] = [
  {
    id: "f-1",
    name: "Initiation à l'Informatique",
    duration: "1 Mois",
    level: "Débutant",
    price: 30000,
    icon: "Monitor",
    description: "Prenez en main un ordinateur moderne : environnement Windows, navigation internet sécurisée, gestion des fichiers.",
    longDescription: "Ce module complet s'adresse à toute personne désireuse d'acquérir les bases de l'informatique. Vous apprendrez à manipuler le clavier, organiser vos dossiers, envoyer des emails professionnels et naviguer en toute sécurité.",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "f-2",
    name: "Secrétariat Bureautique",
    duration: "2 Mois",
    level: "Tous niveaux",
    price: 45000,
    icon: "Briefcase",
    description: "Maîtrise complète de la suite Office : Microsoft Word, Excel de base, PowerPoint pour présentations.",
    longDescription: "Devenez un professionnel de l'administration. Ce cursus inclut la mise en page de documents complexes sous Word, le traitement et l'analyse de données sur tableurs Excel et la création de diaporamas percutants pour des réunions d'affaires.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "f-3",
    name: "Infographie & Graphic Design",
    duration: "3 Mois",
    level: "Intermédiaire",
    price: 75000,
    icon: "Palette",
    description: "Conception graphique professionnelle avec Adobe Photoshop, Illustrator et les bases de la typographie.",
    longDescription: "Apprenez à concevoir des visuels publicitaires, des chartes graphiques, des logos et des maquettes d'impression. Ce module intensif vous donne les clés pour intégrer une agence de communication ou exercer en freelance.",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "f-4",
    name: "Marketing Digital & Réseaux Sociaux",
    duration: "2 Mois",
    level: "Intermédiaire",
    price: 60000,
    icon: "TrendingUp",
    description: "Apprenez à promouvoir vos produits, paramétrer des publicités Facebook/Google et animer une communauté.",
    longDescription: "Le marketing digital est le moteur de croissance moderne. Maîtrisez le SEO, le copywriting, la création d'audiences publicitaires, l'analyse des indicateurs clés (KPIs) et le community management sur Instagram, Facebook et TikTok.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "f-5",
    name: "Montage Vidéo Professionnel",
    duration: "2 Mois",
    level: "Intermédiaire",
    price: 65000,
    icon: "Video",
    description: "Maîtrisez le montage vidéo numérique, l'étalonnage, l'ajout d'effets visuels et de transitions sonores.",
    longDescription: "Créez des vidéos dynamiques pour YouTube, la télévision ou les réseaux sociaux. Apprenez à importer des rushes, couper, ajouter des transitions professionnelles, corriger les couleurs et intégrer des éléments de motion design.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "f-6",
    name: "Bilinguisme & Langues d'Affaires",
    duration: "3 Mois",
    level: "Tous niveaux",
    price: 50000,
    icon: "Languages",
    description: "Perfectionnement en Anglais et Chinois des affaires pour communiquer efficacement avec vos partenaires.",
    longDescription: "Dans un monde interconnecté, le multilinguisme est un passeport vers la réussite. Pratiquez l'expression orale, l'écoute de correspondances d'affaires et apprenez le vocabulaire technique nécessaire pour négocier sereinement à l'international.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "f-7",
    name: "Initiation à l'Intelligence Artificielle",
    duration: "1 Mois",
    level: "Tous niveaux",
    price: 40000,
    icon: "Brain",
    description: "Exploitez la puissance des modèles d'IA (ChatGPT, Midjourney, Claude) pour multiplier votre productivité.",
    longDescription: "Une formation révolutionnaire et inédite ! Apprenez à concevoir des prompts puissants, rédiger des rapports complexes en quelques secondes, générer des images commerciales d'exception et automatiser vos tâches bureautiques récurrentes.",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop"
  }
];

export const PRODUCT_DATA: ProductItem[] = [
  {
    id: "p-1",
    name: "Fournitures scolaires & Bureau",
    category: "fourniture",
    price: 2500,
    unit: "Paquet de papier A4",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop",
    description: "Papier A4 de marque Premium (Double A, Navigator), cahiers de dessin, chemises cartonnées, classeurs et stylos professionnels.",
    available: true
  },
  {
    id: "p-2",
    name: "Dentifrice Longrich au thé blanc",
    category: "longrich",
    price: 3500,
    unit: "tube 200g",
    image: "https://images.unsplash.com/photo-1559599101-30972241702d?q=80&w=600&auto=format&fit=crop",
    description: "Protection complète contre les caries, blanchit les dents sans rayer l'émail, et rafraîchit durablement l'haleine.",
    available: true
  },
  {
    id: "p-3",
    name: "Gobelet alcalin en acier Longrich",
    category: "longrich",
    price: 45000,
    unit: "unité",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    description: "Purifie l'eau en éliminant le chlore résiduel, équilibre le pH corporel et renforce le système immunitaire.",
    available: true
  },
  {
    id: "p-4",
    name: "Bijoux et colliers en argent",
    category: "bijoux",
    price: 15000,
    unit: "parure",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
    description: "Bijoux finement ciselés, parures de mariage et gourmettes élégantes en argent massif pour toutes vos cérémonies.",
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
  }
];

export const GALLERY_DATA: GalleryItem[] = [
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
    author: "Responsable Marketing C&T",
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
