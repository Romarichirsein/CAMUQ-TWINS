# Spécification de Conception : Onglet "ACTIVITÉS / ÉVÉNEMENTS"

**Date** : 14 Septembre 2026  
**Statut** : Validé et enrichi avec les consignes utilisateur et l'événement CNPS  
**Projet** : CAMUQ & TWINS EMPIRE  

---

## 1. Contexte & Objectif

Intégrer un nouvel onglet principal de premier niveau intitulé **"ACTIVITÉS / ÉVÉNEMENTS"** dans la barre de navigation du site CAMUQ & TWINS EMPIRE, ainsi qu'une page dédiée permettant de :
- Construire une **chronologie vivante de la vie de l'entreprise** (rencontres, formations, cérémonies, partenariats, actions sociales, événements professionnels, activités de CAMUQ AND TWINS TRAINING).
- Présenter chaque événement sous forme de **petite fiche structurée et élégante** :
  - 📅 **Date**
  - 📍 **Lieu**
  - 🎯 **Activité / Catégorie**
  - 📝 **Résumé & Témoignage / Citation**
  - 📷 **Photos & Visuels**
- Proposer des filtres par statut (*Tous*, *À venir*, *En cours*, *Passés / Rétrospectives*) et recherche rapide.
- Permettre d'ouvrir une modale pour afficher le compte-rendu complet, photos en haute résolution et points clés.

---

## 2. Emplacement & Navigation

### 2.1 Barre de Navigation Supérieure (Desktop)
L'onglet est inséré entre **"Nos Formations"** et **"À Propos"** :
1. Accueil
2. Nos Services (Menu déroulant)
3. Nos Formations
4. **ACTIVITÉS / ÉVÉNEMENTS** *(Nouvel onglet cliquable avec indicateur actif)*
5. À Propos (Menu déroulant)
6. Assistant IA
7. Bouton Contact (Bouton d'appel à l'action jaune)

### 2.2 Menu Mobile
L'onglet **ACTIVITÉS / ÉVÉNEMENTS** est ajouté dans le tiroir de navigation mobile, au même niveau hiérarchique.

### 2.3 Pied de page (Footer)
Ajout du lien direct "Activités & Événements" dans la section Liens utiles.

### 2.4 Routage & URLs
- Vue supportée : `currentView = "events"`
- Synchronisation d'URL : `/activites-evenements` et `/evenements`
- Gestion de l'historique du navigateur (`popstate`, `pushState`).

---

## 3. Données des Événements (`EVENTS_DATA` dans `src/data.ts`)

Structure de chaque fiche d'activité :
```typescript
export interface EventItem {
  id: string;
  title: string;
  category: "Rencontre Littéraire & Culturelle" | "Formation Spéciale" | "Séminaire & Conférence" | "Atelier Pratique" | "Action Communautaire";
  status: "upcoming" | "ongoing" | "past";
  badge: string;
  date: string;
  time?: string;
  location: string;
  targetAudience?: string;
  summary: string;
  quote?: string;
  description: string[];
  image: string;
  galleryImages?: string[];
  actionLink?: {
    type: "contact" | "whatsapp" | "details";
    label: string;
  };
}
```

### Événements inclus dans la chronologie :
1. **10 septembre 2026 – Participation au 14ᵉ Café littéraire de la CNPS** *(Événement Phare Récent)*
   - Statut : `past` | Badge : *Rétrospective / Événement Récent*
   - Date : 10 Septembre 2026
   - Lieu : Siège / Espace de la CNPS, Yaoundé
   - Activité : Rencontre Littéraire & Culturelle
   - Ouvrage à l'honneur : « La génération buzz ou l’ivresse du divertissement, l’urgence d’estomper » d'Eugène Demaison Betteng
   - Résumé : "La Direction Générale de CAMUQ AND TWINS EMPIRE Ltd a pris part à la 14ᵉ édition du Café littéraire de la CNPS, consacrée à l'ouvrage « La génération buzz ou l’ivresse du divertissement, l’urgence d’estomper » de Eugène Demaison Betteng. Cette rencontre a été l'occasion d'échanger autour de la culture, de la littérature, des transformations sociales et de l'influence du numérique dans notre quotidien."
   - Citation : « Chez CAMUQ AND TWINS EMPIRE Ltd, nous croyons que l'entreprise doit aussi être un espace d'apprentissage, d'ouverture et de réflexion. »
   - Photo : `/cafe-litteraire-cnps.jpg`

2. **Session Spéciale : Formation Gratuite de 2 Mois en Informatique & IA**
   - Statut : `ongoing` | Badge : *En cours*
   - Date : Mars - Avril 2026
   - Lieu : Siège CAMUQ & TWINS EMPIRE
   - Activité : Formation Professionnelle Gratuite
   - Image : `/banniere-nos-formations.jpg`

3. **Vacances Utiles Édition 2026 - Initiation à l'Informatique des Jeunes (9 à 17 ans)**
   - Statut : `upcoming` | Badge : *Inscriptions Ouvertes*
   - Date : Du 15 Juin au 15 Août 2026
   - Lieu : Siège CAMUQ & TWINS EMPIRE
   - Activité : Formation Vacances Utiles
   - Image : `/flyers.jpeg`

4. **Masterclass Infographie & Design Visuel Professionnel**
   - Statut : `upcoming` | Badge : *Prochainement*
   - Date : Mai 2026
   - Lieu : En présentiel & En ligne
   - Activité : Atelier Pratique & Masterclass
   - Image : `/formation-infographie.jpg`

---

## 4. Composant Utilisateur `EventsPage.tsx`

Le composant affiche :
1. **Header immersif** :
   - Badge "Actualités & Événements"
   - Titre : "Nos Activités & Événements"
   - Sous-titre : "Chronologie de la vie de CAMUQ & TWINS EMPIRE : rencontres, formations, partenariats et actions culturelles."
2. **Barre de filtres & recherche** :
   - Filtres par statut : *Tous*, *À venir*, *En cours*, *Rétrospectives / Passés*.
   - Recherche textuelle instantanée (titre, lieu, mots-clés).
3. **Cartes sous forme de fiches structurées** :
   - Fiche respectant la formule : 📅 Date | 📍 Lieu | 🎯 Activité | 📝 Résumé | 📷 Photo.
   - Encart citation mise en valeur pour les événements à caractère culturel/institutionnel.
   - Bouton "Lire le compte-rendu complet" / "Détails" (modale) et "Participer" / "Nous contacter".
4. **Modale complète de consultation** :
   - Photo grand format, texte intégral, citation clé, boutons de partage/contact.

---

## 5. Support Multilingue (i18n)

Traductions complètes en français et en anglais dans `src/i18n.ts`.

---

## 6. Plan de Test & Vérification

- `npm run build` : 0 erreur TypeScript / Vite.
- Vérification visuelle et responsive de l'onglet dans le Header et le menu mobile.
- Vérification de l'affichage de la fiche du Café littéraire de la CNPS du 10 septembre 2026 avec sa photo.
- Vérification du bon fonctionnement des filtres et de la modale.
