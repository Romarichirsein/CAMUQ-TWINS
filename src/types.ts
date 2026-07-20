export interface ServiceItem {
  id: string;
  name: string;
  category: "secretariat" | "imprimerie" | "autres" | "commerce";
  priceEstimate: string;
  unit: string;
  baseCost: number;
  description: string;
  icon: string;
}

export interface TrainingItem {
  id: string;
  name: string;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux";
  price: number;
  icon: string;
  description: string;
  longDescription?: string;
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: "fourniture" | "longrich" | "bijoux";
  price: number;
  unit: string;
  image: string;
  description: string;
  available: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  views: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "bureautique" | "imprimerie" | "formations" | "autres";
  image: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface AppointmentItem {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: string;
  date: string;
  time: string;
  notes: string;
  status: "En attente" | "Confirmé" | "Annulé";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "Non lu" | "Lu" | "Répondu";
  createdAt: string;
}

export interface UserItem {
  id: string;
  email: string;
  name: string;
  role: "admin" | "employee" | "visitor";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
