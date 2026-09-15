# ACTIVITÉS / ÉVÉNEMENTS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter l'onglet principal "ACTIVITÉS / ÉVÉNEMENTS" dans la navigation du site CAMUQ & TWINS EMPIRE, avec une page dédiée présentant une chronologie vivante de l'entreprise sous forme de petites fiches structurées (Date, Lieu, Activité, Résumé, Photos), incluant l'événement marquant du Café littéraire de la CNPS du 10 septembre 2026, puis pousser les modifications sur GitHub.

**Architecture:** 
- `src/data.ts` : Modèle de données `EventItem` et tableau `EVENTS_DATA`.
- `src/i18n.ts` : Traductions bilingues FR/EN pour les libellés de navigation et de la page.
- `src/components/EventsPage.tsx` : Composant React modulaire affichant la chronologie sous forme de fiches structurées (📅 Date | 📍 Lieu | 🎯 Activité | 📝 Résumé | 📷 Photos) avec filtres de statut, barre de recherche et modale de lecture.
- `src/components/Header.tsx` & `src/components/Footer.tsx` : Intégration de l'onglet entre "Nos Formations" et "À Propos".
- `src/App.tsx` : Routage URL (`/activites-evenements`, `/evenements`), état `events` et redirection pré-remplie vers le formulaire de contact.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, Git.

---

### Task 1: Données et Modèle dans `src/data.ts`

**Files:**
- Modify: `src/data.ts`

- [ ] **Step 1: Ajouter l'interface `EventItem` et `EVENTS_DATA` dans `src/data.ts`**
  - Définir `EventItem` avec `id`, `title`, `category`, `status` ("upcoming" | "ongoing" | "past"), `badge`, `date`, `time`, `location`, `targetAudience`, `summary`, `quote`, `description`, `image`, `priceBadge`.
  - Ajouter la fiche de l'événement CNPS du 10 septembre 2026 avec l'image `cafe-litteraire-cnps.jpg`.
  - Ajouter les fiches pour la formation gratuite de 2 mois, les Vacances Utiles 2026 et la Masterclass Infographie.
- [ ] **Step 2: Vérifier le typage TypeScript**
- [ ] **Step 3: Commit git**

---

### Task 2: Traductions Bilingues dans `src/i18n.ts`

**Files:**
- Modify: `src/i18n.ts`

- [ ] **Step 1: Ajouter les clés `nav.events` en français et anglais**
- [ ] **Step 2: Ajouter la section `events` dans `translations.fr` et `translations.en`**
  - Titres, sous-titres, badges de statut ("Tous", "À venir", "En cours", "Passés"), boutons d'action et modale.
- [ ] **Step 3: Commit git**

---

### Task 3: Création du Composant `src/components/EventsPage.tsx`

**Files:**
- Create: `src/components/EventsPage.tsx`

- [ ] **Step 1: Implémenter le composant `EventsPage`**
  - Header visuel avec badge "Actualités & Événements".
  - Barre de contrôle interactive (filtres de statuts + recherche temps réel).
  - Format fiches structurées (📅 Date | 📍 Lieu | 🎯 Activité | 📝 Résumé | 📷 Photo) avec encart de citation pour les événements culturels.
  - Modale pop-up "Détails complets de l'activité" avec image plein format et texte intégral.
  - Boutons d'interaction : "S'inscrire / Participer" (liaison `onRegister`) et "WhatsApp".
- [ ] **Step 2: Commit git**

---

### Task 4: Intégration dans le Header (`src/components/Header.tsx`)

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Insérer l'onglet "ACTIVITÉS / ÉVÉNEMENTS" dans le menu Desktop**
  - Positionné entre "Nos Formations" et "À Propos".
  - Gestion du style actif lorsque `activeSection === "events"`.
- [ ] **Step 2: Insérer l'élément dans le menu Mobile**
- [ ] **Step 3: Commit git**

---

### Task 5: Intégration dans le Footer (`src/components/Footer.tsx`)

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Ajouter le lien rapide "Activités & Événements" dans la liste des liens utiles**
- [ ] **Step 2: Commit git**

---

### Task 6: Routage et Gestion d'État dans `src/App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Mettre à jour `ViewType` avec `"events"`**
- [ ] **Step 2: Mettre à jour `pathToViewMap` et `viewToPathMap`**
  - `/activites-evenements` -> `"events"`
  - `/evenements` -> `"events"`
- [ ] **Step 3: Rendre `<EventsPage onRegister={handleRegisterEvent} />`**
- [ ] **Step 4: Implémenter `handleRegisterEvent` pour rediriger vers la vue Contact avec sujet pré-rempli**
- [ ] **Step 5: Commit git**

---

### Task 7: Build & Vérification

- [ ] **Step 1: Exécuter `npm run build`**
- [ ] **Step 2: Vérifier 0 avertissement ni erreur TypeScript/Vite**

---

### Task 8: Push sur GitHub

- [ ] **Step 1: Vérifier `git status` et `git log`**
- [ ] **Step 2: Exécuter `git push origin main`**
- [ ] **Step 3: Confirmer la mise à jour en ligne**
