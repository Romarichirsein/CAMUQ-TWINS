# Spécification de Conception : Onglet "ACTIVITÉS / ÉVÉNEMENTS"

**Date** : 14 Septembre 2026  
**Statut** : Validé par l'utilisateur  
**Projet** : CAMUQ & TWINS EMPIRE  

---

## 1. Contexte & Objectif

L'objectif est d'intégrer un nouvel onglet principal de premier niveau intitulé **"ACTIVITÉS / ÉVÉNEMENTS"** dans la barre de navigation du site CAMUQ & TWINS EMPIRE, ainsi qu'une page dédiée permettant aux visiteurs de :
- Consulter les activités et événements passés, en cours et à venir de l'entreprise (ex. *Vacances Utiles 2026*, *Session de Formation Gratuite de 2 mois*, *Séminaires & Conférences*, *Cérémonies de remise d'attestations*, *Ateliers pratiques IA & Infographie*).
- Filtrer facilement les événements par statut (*Tous*, *À venir*, *En cours*, *Passés*) et effectuer une recherche par mots-clés.
- Consulter le détail d'un événement via une modale complète avec date, horaires, lieu, public ciblé et programme.
- S'inscrire ou réserver directement sa place via une redirection automatique vers la page Contact avec sujet pré-rempli ou via WhatsApp.

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
L'onglet **ACTIVITÉS / ÉVÉNEMENTS** est ajouté dans le tiroir de navigation mobile, exactement au même niveau hiérarchique, accessible en un clic.

### 2.3 Pied de page (Footer)
Ajout d'un lien rapide "Activités & Événements" dans la section des liens utiles du Footer.

### 2.4 Routage & URLs
- Vues supportées : `currentView = "events"`
- Synchronisation d'URL : `/activites-evenements` et `/evenements`
- Gestion de l'historique de navigation du navigateur (popstate / back / forward).

---

## 3. Données des Événements (`EVENTS_DATA`)

Un nouveau jeu de données structuré `EVENTS_DATA` est ajouté dans `src/data.ts` et exporté pour l'application :

```typescript
export interface EventItem {
  id: string;
  title: string;
  category: "Formation Spéciale" | "Séminaire & Conférence" | "Atelier Pratique" | "Action Communautaire";
  status: "upcoming" | "ongoing" | "past";
  badge: string;
  date: string;
  time: string;
  location: string;
  targetAudience: string;
  summary: string;
  description: string[];
  image: string;
  capacity?: string;
  priceBadge?: string;
}
```

### Événements initiaux inclus :
1. **Vacances Utiles Édition 2026 - Initiation à l'Informatique des Jeunes (9 à 17 ans)**
   - Statut : `upcoming` | Badge : *Inscriptions Ouvertes*
   - Dates : Du 15 Juin au 15 Août 2026
   - Thèmes : Bureautique, Infographie junior, Initiation IA, Internet responsable
2. **Session Spéciale : Formation Gratuite de 2 Mois en Informatique & IA**
   - Statut : `ongoing` | Badge : *En cours*
   - Dates : Mars - Avril 2026
   - Thèmes : Pratique bureautique, automatisation, outils IA modernes
3. **Masterclass Infographie & Design Visuel Professionnel**
   - Statut : `upcoming` | Badge : *Bientôt*
   - Dates : Mai 2026
   - Thèmes : Photoshop, Illustrator, identité visuelle, création de supports publicitaires
4. **Cérémonie de Remise des Attestations de Formation & Réseautage**
   - Statut : `past` | Badge : *Terminé*
   - Dates : Février 2026
   - Thèmes : Célébration des lauréats, exposition des projets et opportunités professionnelles

---

## 4. Composant Utilisateur `EventsPage.tsx`

Le composant `src/components/EventsPage.tsx` propose :
1. **Hero Header** : Titre "Nos Activités & Événements", badge dynamique "Agenda & Réalisations", sous-titre explicatif.
2. **Barre de Contrôle** :
   - Filtres de statut : *Tous* (total), *À venir* (pastille verte), *En cours* (pastille bleue), *Passés* (pastille ardoise).
   - Barre de recherche avec icône loupe filtrant en direct sur le titre, lieu et mots-clés.
3. **Cartes d'Événements** :
   - Image d'illustration soignée avec badge de statut et catégorie.
   - Encart calendrier visuel (Date, Heure, Lieu, Public cible).
   - Résumé clair.
   - Boutons :
     - *Détails complets* (ouvre la modale).
     - *S'inscrire / Participer* (action directe redirigeant vers Contact ou WhatsApp).
4. **Modale Pop-up Détails** :
   - Fenêtre modale avec programme détaillé point par point, public cible, contact d'inscription rapide.
5. **État Vide** :
   - Affichage bienveillant si aucun événement ne correspond à la recherche, avec bouton pour réinitialiser les filtres.

---

## 5. Support Multilingue (i18n)

Ajout dans `src/i18n.ts` pour le français (`fr`) et l'anglais (`en`) :
- Libellé navigation : `"Activités / Événements"` / `"Activities & Events"`.
- Textes de la page d'événements : titre, sous-titre, filtres (*All*, *Upcoming*, *Ongoing*, *Past*), boutons d'action (*Details*, *Register*, *Reset filters*).

---

## 6. Plan de Test & Vérification

1. **Compilation TypeScript & Build Vite** :
   - Exécution de `npm run build` pour garantir 0 erreur de types ou de syntaxe.
2. **Vérification de Navigation** :
   - Clic sur l'onglet "ACTIVITÉS / ÉVÉNEMENTS" dans le Header desktop -> Affichage immédiat de la vue `events`.
   - Clic sur l'élément dans le menu mobile -> Fermeture du tiroir et affichage de la page.
   - Vérification du lien dans le Footer.
   - Test de l'URL directe `/activites-evenements` avec rechargement de page.
3. **Vérification des Filtres & Modale** :
   - Filtre par "À venir", "En cours", "Passés" et recherche textuelle.
   - Clic sur "Détails" pour ouvrir et fermer la modale.
   - Clic sur "S'inscrire" -> Redirection vers Contact avec formulaire pré-rempli.
