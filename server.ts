import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// IN-MEMORY COMPREHENSIVE DB (Pre-seeded with C&T Flyer Data)
// ==========================================

let database = {
  formations: [
    {
      id: "f-1",
      name: "Initiation à l'Informatique",
      duration: "1 Mois",
      level: "Débutant",
      price: 30000,
      icon: "Monitor",
      description: "Prenez en main un ordinateur moderne : environnement Windows, navigation internet sécurisée, gestion des fichiers.",
      longDescription: "Ce module complet s'adresse à toute personne désireuse d'acquérir les bases de l'informatique.",
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
      longDescription: "Devenez un professionnel de l'administration et de la gestion documentaire.",
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
      longDescription: "Apprenez à concevoir des visuels publicitaires, des chartes graphiques, des logos et des maquettes d'impression.",
      image: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "f-4",
      name: "Marketing Digital",
      duration: "2 Mois",
      level: "Intermédiaire",
      price: 60000,
      icon: "TrendingUp",
      description: "Apprenez à promouvoir vos produits, paramétrer des publicités Facebook/Google et animer une communauté.",
      longDescription: "Le marketing digital est le moteur de croissance moderne. Maîtrisez le SEO, le copywriting et les réseaux.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "f-5",
      name: "Montage Vidéo",
      duration: "2 Mois",
      level: "Intermédiaire",
      price: 65000,
      icon: "Video",
      description: "Maîtrisez le montage vidéo numérique, l'étalonnage, l'ajout d'effets visuels et de transitions sonores.",
      longDescription: "Créez des vidéos dynamiques pour YouTube, la télévision ou les réseaux sociaux.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "f-6",
      name: "Langues Bilingues (EN/CN/FR)",
      duration: "3 Mois",
      level: "Tous niveaux",
      price: 50000,
      icon: "Languages",
      description: "Perfectionnement en Anglais et Chinois des affaires pour communiquer efficacement avec vos partenaires.",
      longDescription: "Dans un monde interconnecté, le bilinguisme est votre atout business suprême.",
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
      longDescription: "Une formation révolutionnaire ! Apprenez à concevoir des prompts puissants et automatiser vos tâches.",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop"
    }
  ],
  services: [
    { id: "s-1", name: "Saisie Bureautique Bilingue", category: "secretariat", priceEstimate: "500 FCFA / page", unit: "page", baseCost: 500, description: "Saisie de thèses, mémoires, rapports administratifs.", icon: "FileText" },
    { id: "s-2", name: "Impression Laser Haute Qualité", category: "secretariat", priceEstimate: "100 FCFA / page", unit: "page", baseCost: 100, description: "Impression laser noir/couleur rapide.", icon: "Printer" },
    { id: "s-3", name: "Photocopie & Reliure Simple", category: "secretariat", priceEstimate: "50 FCFA / page", unit: "page", baseCost: 50, description: "Reliures spirales et thermiques professionnelles.", icon: "FolderOpen" },
    { id: "s-4", name: "Faire-part & Cartes de visite", category: "secretariat", priceEstimate: "5 000 FCFA / lot", unit: "lot", baseCost: 5000, description: "Conception et tirage de cartes de visites, billets d'invitation.", icon: "CreditCard" },
    { id: "s-5", name: "Plastification de documents", category: "secretariat", priceEstimate: "500 FCFA / doc", unit: "document", baseCost: 500, description: "Plastification à chaud protectrice.", icon: "Lock" },
    { id: "s-6", name: "Banderoles Grand Format", category: "imprimerie", priceEstimate: "5 000 FCFA / m²", unit: "m²", baseCost: 5000, description: "Banderoles résistantes aux intempéries.", icon: "Flag" },
    { id: "s-7", name: "Roll-up Publicitaires", category: "imprimerie", priceEstimate: "35 000 FCFA / kit", unit: "kit", baseCost: 35000, description: "Kit roll-up publicitaire complet de salon.", icon: "Layout" },
    { id: "s-8", name: "Personnalisation Mugs / Stylos", category: "imprimerie", priceEstimate: "3 500 FCFA", unit: "unité", baseCost: 3500, description: "Mugs et stylos personnalisés de haute fidélité.", icon: "Coffee" },
    { id: "s-9", name: "Flocage Textiles (T-shirts)", category: "imprimerie", priceEstimate: "5 500 FCFA", unit: "unité", baseCost: 5500, description: "Polos, T-shirts et casquettes personnalisés.", icon: "Shirt" },
    { id: "s-10", name: "Cyber Café Fibre & Photo Minute", category: "autres", priceEstimate: "500 FCFA / session", unit: "session", baseCost: 500, description: "Recherche en ligne et tirage d'identité minute.", icon: "Camera" },
    { id: "s-11", name: "MTN MoMo & Orange Money", category: "autres", priceEstimate: "Grille officielle", unit: "transaction", baseCost: 0, description: "Dépôts, retraits et transferts rapides.", icon: "Smartphone" },
    { id: "s-12", name: "Pré-enrôlement CNI & Passeport", category: "autres", priceEstimate: "1 500 FCFA", unit: "formulaire", baseCost: 1500, description: "Saisie et soumission rapide de vos fiches officielles.", icon: "FileCheck" },
    { id: "s-13", name: "Abonnement Canal+ & Factures", category: "autres", priceEstimate: "Selon bouquet", unit: "renouvellement", baseCost: 0, description: "Réabonnement direct sans frais supplémentaires.", icon: "Tv" }
  ],
  products: [
    { id: "p-1", name: "Rames de Papier A4 Premium", category: "fourniture", price: 2500, unit: "rame", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop", description: "Papier blanc A4 ultra-polyvalent pour photocopieurs.", available: true },
    { id: "p-2", name: "Dentifrice au Thé Blanc Longrich", category: "longrich", price: 3500, unit: "tube", image: "https://images.unsplash.com/photo-1559599101-30972241702d?q=80&w=600&auto=format&fit=crop", description: "Soin complet, prévient la sensibilité dentaire.", available: true },
    { id: "p-3", name: "Gobelet Alcalin de Santé Longrich", category: "longrich", price: 45000, unit: "gobelet", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop", description: "Transforme l'eau en eau alcaline saine.", available: true },
    { id: "p-4", name: "Parures & Bijoux d'Exception", category: "bijoux", price: 15000, unit: "parure", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop", description: "Bijoux raffinés pour vos soirées de gala.", available: true }
  ],
  blog: [
    {
      id: "b-1",
      title: "Comment l'IA révolutionne le secrétariat moderne au Cameroun",
      summary: "Découvrez comment l'intégration d'outils d'intelligence artificielle permet aux secrétaires de décupler leur efficacité.",
      content: "La maîtrise des traitements de texte de base n'est plus suffisante. L'Intelligence Artificielle (IA) à travers des outils comme ChatGPT, Claude et Copilot permet de générer des brouillons de courriers, reformuler des rapports bilingues et automatiser des calendriers. Notre formation exclusive permet aux professionnels de prendre cette longueur d'avance essentielle.",
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
      content: "Obtenir ou renouveler son passeport camerounais nécessite un processus rigoureux en ligne. Beaucoup font face à des rejets d'enrôlement dus à des erreurs de saisie ou des pièces justificatives non conformes. Notre Cyber Café vous assiste de bout en bout.",
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
      content: "Votre image de marque est le premier contact avec votre prospect. Un flyer mal structuré ou une banderole pixélisée transmettent une image de manque de professionnalisme. L'impression sur des supports de qualité augmente instantanément la perception de valeur.",
      image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
      date: "01 Juillet 2026",
      author: "Responsable Marketing C&T",
      category: "Marketing",
      views: 215
    }
  ],
  gallery: [
    { id: "g-1", title: "Atelier d'impression grand format", category: "imprimerie", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", description: "Notre traceur numérique de dernière génération produisant des banderoles publicitaires éclatantes." },
    { id: "g-2", title: "Classe de formation IA & Bureautique", category: "formations", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop", description: "Étudiants en pleine pratique d'ingénierie de prompts." },
    { id: "g-3", title: "Notre pôle secrétariat bilingue", category: "bureautique", image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop", description: "Espace moderne dédié à la mise en page de rapports d'études." },
    { id: "g-4", title: "T-shirts corporatifs personnalisés", category: "imprimerie", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop", description: "Flocage de précision réalisé pour le compte d'une multinationale partenaire." },
    { id: "g-5", title: "Cyber Café moderne et rapide", category: "autres", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=600&auto=format&fit=crop", description: "Ordinateurs de pointe sous connexion fibre optique." }
  ],
  appointments: [
    {
      id: "apt-1",
      clientName: "Samuel Eto'o",
      clientEmail: "samuel@fecafoot.cm",
      clientPhone: "699 99 99 99",
      serviceType: "Initiation à l'Intelligence Artificielle",
      date: "2026-07-20",
      time: "10:00",
      notes: "Souhaite inscrire son personnel exécutif",
      status: "Confirmé",
      createdAt: new Date().toISOString()
    }
  ],
  messages: [
    {
      id: "msg-1",
      name: "Jean-Pierre",
      email: "jp@gmail.com",
      phone: "677 12 34 56",
      subject: "Demande de devis d'impression livres",
      message: "Bonjour, j'aimerais imprimer 500 exemplaires d'un livre de 120 pages en reliure brochée. Quels sont vos tarifs ?",
      status: "Non lu",
      createdAt: new Date().toISOString()
    }
  ],
  testimonials: [
    { id: "t-1", name: "Franck Emmanuel", role: "Directeur de Projet", company: "SGC-Group", content: "L'impression de nos roll-up publicitaires et de nos brochures d'affaires a été effectuée dans un temps record de 24h. Finition irréprochable !", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
    { id: "t-2", name: "Dr. Marie Noëlle", role: "Enseignante-Chercheuse", company: "Université de Yaoundé", content: "J'ai confié la saisie et la mise en page de ma thèse de doctorat à l'équipe secrétariat. Une rigueur bilingue exemplaire !", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" }
  ],
  subscribers: [
    "contact@nhrdigital.com"
  ],
  users: [
    { id: "u-1", email: "admin@empire.com", name: "C&T Admin Supérieur", role: "admin", createdAt: new Date().toISOString() },
    { id: "u-2", email: "employee@empire.com", name: "Responsable Formation", role: "employee", createdAt: new Date().toISOString() }
  ]
};

// ==========================================
// REST API ENDPOINTS
// ==========================================

// Authentication (Mock password for simplicity but premium feel)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: "Veuillez fournir un email et un mot de passe." });
    return;
  }

  // Find user by email
  const foundUser = database.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (foundUser) {
    // Standard mock passwords
    if (foundUser.role === "admin" && password === "admin") {
      res.json({ success: true, user: foundUser });
      return;
    } else if (foundUser.role === "employee" && password === "employee") {
      res.json({ success: true, user: foundUser });
      return;
    }
  }

  // Fallback check to let users play with it easily
  if (password === "admin") {
    const newUser = { id: `u-${Date.now()}`, email, name: "Administrateur Invité", role: "admin" as const, createdAt: new Date().toISOString() };
    database.users.push(newUser);
    res.json({ success: true, user: newUser });
    return;
  }

  res.status(401).json({ error: "Identifiants invalides. Utilisez 'admin@empire.com' avec le mot de passe 'admin' pour vous connecter." });
});

// App Config / Master Data Endpoint
app.get("/api/master-data", (req, res) => {
  res.json(database);
});

// --- APPOINTMENTS CRUD ---
app.post("/api/appointments", (req, res) => {
  const { clientName, clientEmail, clientPhone, serviceType, date, time, notes } = req.body;
  if (!clientName || !clientEmail || !clientPhone || !serviceType || !date || !time) {
    res.status(400).json({ error: "Tous les champs requis ne sont pas remplis." });
    return;
  }
  const newAppointment = {
    id: `apt-${Date.now()}`,
    clientName,
    clientEmail,
    clientPhone,
    serviceType,
    date,
    time,
    notes: notes || "",
    status: "En attente" as const,
    createdAt: new Date().toISOString()
  };
  database.appointments.unshift(newAppointment);
  res.json({ success: true, appointment: newAppointment });
});

app.put("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const apt = database.appointments.find(a => a.id === id);
  if (apt) {
    if (status) apt.status = status;
    res.json({ success: true, appointment: apt });
  } else {
    res.status(404).json({ error: "Rendez-vous non trouvé." });
  }
});

app.delete("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  database.appointments = database.appointments.filter(a => a.id !== id);
  res.json({ success: true, message: "Rendez-vous supprimé." });
});

// --- MESSAGES / LEADS CRUD ---
app.post("/api/messages", (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "Veuillez remplir les champs obligatoires (Nom, Email, Message)." });
    return;
  }
  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    subject: subject || "Formulaire de Contact Direct",
    message,
    status: "Non lu" as const,
    createdAt: new Date().toISOString()
  };
  database.messages.unshift(newMessage);
  res.json({ success: true, message: newMessage });
});

app.put("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const msg = database.messages.find(m => m.id === id);
  if (msg) {
    if (status) msg.status = status;
    res.json({ success: true, message: msg });
  } else {
    res.status(404).json({ error: "Message non trouvé." });
  }
});

app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  database.messages = database.messages.filter(m => m.id !== id);
  res.json({ success: true, message: "Message supprimé." });
});

// --- FORMATIONS CRUD ---
app.post("/api/formations", (req, res) => {
  const { name, duration, level, price, icon, description, longDescription, image } = req.body;
  if (!name || !duration || !price) {
    res.status(400).json({ error: "Champs requis manquants pour la formation." });
    return;
  }
  const newFormation = {
    id: `f-${Date.now()}`,
    name,
    duration,
    level: level || "Tous niveaux",
    price: Number(price),
    icon: icon || "Monitor",
    description: description || "",
    longDescription: longDescription || "",
    image: image || "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600&auto=format&fit=crop"
  };
  database.formations.push(newFormation);
  res.json({ success: true, formation: newFormation });
});

app.put("/api/formations/:id", (req, res) => {
  const { id } = req.params;
  const index = database.formations.findIndex(f => f.id === id);
  if (index !== -1) {
    database.formations[index] = { ...database.formations[index], ...req.body };
    res.json({ success: true, formation: database.formations[index] });
  } else {
    res.status(404).json({ error: "Formation non trouvée." });
  }
});

app.delete("/api/formations/:id", (req, res) => {
  const { id } = req.params;
  database.formations = database.formations.filter(f => f.id !== id);
  res.json({ success: true, message: "Formation supprimée." });
});

// --- SERVICES CRUD ---
app.post("/api/services", (req, res) => {
  const { name, category, priceEstimate, unit, baseCost, description, icon } = req.body;
  if (!name || !category) {
    res.status(400).json({ error: "Nom et catégorie sont requis." });
    return;
  }
  const newService = {
    id: `s-${Date.now()}`,
    name,
    category,
    priceEstimate: priceEstimate || "Sur devis",
    unit: unit || "unité",
    baseCost: Number(baseCost) || 0,
    description: description || "",
    icon: icon || "Layers"
  };
  database.services.push(newService);
  res.json({ success: true, service: newService });
});

app.put("/api/services/:id", (req, res) => {
  const { id } = req.params;
  const index = database.services.findIndex(s => s.id === id);
  if (index !== -1) {
    database.services[index] = { ...database.services[index], ...req.body };
    res.json({ success: true, service: database.services[index] });
  } else {
    res.status(404).json({ error: "Service non trouvé." });
  }
});

app.delete("/api/services/:id", (req, res) => {
  const { id } = req.params;
  database.services = database.services.filter(s => s.id !== id);
  res.json({ success: true, message: "Service supprimé." });
});

// --- PRODUCTS CRUD ---
app.post("/api/products", (req, res) => {
  const { name, category, price, unit, image, description, available } = req.body;
  if (!name || !category || !price) {
    res.status(400).json({ error: "Champs requis manquants pour le produit." });
    return;
  }
  const newProduct = {
    id: `p-${Date.now()}`,
    name,
    category,
    price: Number(price),
    unit: unit || "pièce",
    image: image || "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop",
    description: description || "",
    available: available !== undefined ? available : true
  };
  database.products.push(newProduct);
  res.json({ success: true, product: newProduct });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const index = database.products.findIndex(p => p.id === id);
  if (index !== -1) {
    database.products[index] = { ...database.products[index], ...req.body };
    res.json({ success: true, product: database.products[index] });
  } else {
    res.status(404).json({ error: "Produit non trouvé." });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  database.products = database.products.filter(p => p.id !== id);
  res.json({ success: true, message: "Produit supprimé." });
});

// --- BLOG POSTS CRUD ---
app.post("/api/blog", (req, res) => {
  const { title, summary, content, category, image, author } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "Titre et contenu requis." });
    return;
  }
  const newPost = {
    id: `b-${Date.now()}`,
    title,
    summary: summary || title.slice(0, 100) + "...",
    content,
    category: category || "Actualité",
    image: image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    author: author || "C&T Admin",
    views: 1
  };
  database.blog.push(newPost);
  res.json({ success: true, post: newPost });
});

app.put("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  const index = database.blog.findIndex(b => b.id === id);
  if (index !== -1) {
    database.blog[index] = { ...database.blog[index], ...req.body };
    res.json({ success: true, post: database.blog[index] });
  } else {
    res.status(404).json({ error: "Article non trouvé." });
  }
});

app.delete("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  database.blog = database.blog.filter(b => b.id !== id);
  res.json({ success: true, message: "Article supprimé." });
});

// --- NEWSLETTER ---
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Adresse email requise." });
    return;
  }
  if (!database.subscribers.includes(email)) {
    database.subscribers.push(email);
  }
  res.json({ success: true, message: "Inscription à la newsletter validée avec succès !" });
});

// API: AI Assistant Chatbot representing CAMUQ AND TWINS EMPIRE Ltd (C&T)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Le format de la requête est invalide. 'messages' doit être un tableau." });
      return;
    }

    const systemPrompt = `
Vous êtes "C&T Empire AI", l'assistant d'élite virtuel de CAMUQ & TWINS EMPIRE Ltd (représenté par le sigle "C&T").
Votre but est d'accueillir les visiteurs, de répondre à leurs questions sur notre histoire, nos valeurs, nos dirigeants, nos services, nos formations, nos démarches administratives, et de les convertir en clients payants.

Voici les informations officielles sur C&T :
- Nom : CAMUQ AND TWINS EMPIRE Ltd (C&T)
- Slogan : "Building an empire without borders" (Bâtir un empire sans frontières)
- Siège social : Nkolfoulou, Cameroun.
- Direction Générale : Mme Flore NOUTELI-FOYETT (Directrice Générale & Promotrice), forte de plus de 15 années d'expérience en gestion d'entreprises.
- Équipe Dirigeante : Organisée avec la Directrice Générale (DG) au sommet, assistée par un Directeur des Opérations (DO) et un Directeur Commercial et Marketing (DCM).
- Histoire :
  * Fondée en août 2021 sous le nom de "CAMUQ TRADING HOUSE", entreprise individuelle d'abord spécialisée dans le secrétariat bilingue, les fournitures scolaires, l'initiation informatique bilingue.
  * En 2025, la fondatrice ouvre le capital à 2 nouveaux associés (cession de 50% des parts) pour donner naissance à "CAMUQ AND TWINS EMPIRE Ltd", élargissant la vision sans frontières.
- Valeurs cardinales (5) : Excellence, Professionnalisme, Innovation, Intégrité, Satisfaction Client.
- Nos Partenaires de Confiance :
  * SKY TWINS : Partenaire d'import-export et de logistique sans frontières, facilitant l'accès aux meilleures fournitures et équipements d'élite internationaux.
  * APROSAC : Partenaire social et de développement communautaire, engagé pour l'autonomisation, l'insertion professionnelle et la promotion de l'excellence académique.
  * COACT : Partenaire technologique d'innovation, apportant des solutions bureautiques et infographiques avancées propulsées par l'Intelligence Artificielle.
- Domaines principaux : PAPETERIE BILINGUE, IMPRIMERIE NUMÉRIQUE, FORMATIONS PROFESSIONNELLES, COMMERCE DE FOURNITURES & PRODUITS LONGRICH / BIJOUX.

Nos Services phares :
1. Secrétariat Bureautique : Saisie rapide (500 FCFA/page), Impression & photocopie laser (100 FCFA), Reliure, Scan, Plastification de diplômes, Correction de CV et mémoires d'études.
2. Imprimerie Numérique : Banderoles grand format, Roll-up de salons (35 000 FCFA), Flyers promotionnels, Personnalisation d'objets (Mugs, stylos, t-shirts floqués).
3. Cyber Café & Services en Ligne : Cyber haut débit, Photo Minute d'identité, Transferts MTN MoMo & Orange Money, assistance aux pré-enrôlements en ligne (Passeport, Carte d'Identité CNI), abonnements Canal+ et règlements de factures d'eau/électricité.
4. Formations Certifiantes : Initiation à l'Informatique (30K FCFA), Secrétariat Bureautique (45K), Infographie & Design (75K), Marketing Digital (60K), Montage Vidéo (65K), Langues d'affaires (Chinois/Anglais, 50K) et Initiation à l'Intelligence Artificielle (40K).

Directives de communication :
- Soyez accueillant, extrêmement professionnel et inspirant.
- Répondez de manière structurée et concise en français (ou anglais si l'utilisateur l'utilise).
- S'ils souhaitent s'inscrire ou réserver un service, invitez-les chaleureusement à utiliser l'Estimateur de devis ou le formulaire de Prise de Rendez-vous disponibles sur notre plateforme.
`;

    const lastMessage = messages[messages.length - 1];
    
    let formattedPrompt = `[Instructions Système]: ${systemPrompt}\n\n`;
    const historyToInclude = messages.slice(-8);
    historyToInclude.forEach((msg: any) => {
      const roleName = msg.role === "user" ? "Utilisateur" : "Assistant";
      formattedPrompt += `${roleName}: ${msg.content}\n`;
    });
    formattedPrompt += `Assistant:`;

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedPrompt,
    });

    const reply = response.text || "Désolé, je rencontre des difficultés à formuler une réponse. Veuillez réessayer ou nous contacter directement.";
    res.json({ reply });
  } catch (err: any) {
    console.error("Gemini API error in C&T Chat:", err);
    res.status(500).json({ error: "Erreur de l'assistant IA. Veuillez vérifier votre clé d'API ou réessayer." });
  }
});

// Configure Vite middleware in development or serve static build in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[C&T SERVER] Serveur premium actif sur http://localhost:${PORT}`);
  });
}

startServer();
