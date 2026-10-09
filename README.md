# 🚀 DeskFlow - Application de Gestion et de Réservation de Coworking

DeskFlow est une application web moderne permettant de gérer des espaces de coworking, des sites, des ressources (bureaux, salles de réunion) et des réservations avec une gestion fine des quotas et des rôles utilisateurs.

## ⚙️ Prérequis

Avant de lancer le projet, assure-toi d'avoir installé sur ta machine :

* **Node.js** (version 18 ou supérieure recommandée)

* **npm** (ou un gestionnaire de paquets équivalent comme `pnpm` ou `yarn`)

* *(Optionnel)* **Supabase CLI** si tu souhaites faire tourner l'instance Supabase en local.

## 🛠️ Installation et Lancement en Local

1. **Cloner le dépôt Git :**

   ```
   git clone <URL_DU_REPO>
   cd DeskFlow
   
   ```

2. **Installer les dépendances :**

   ```
   npm install
   
   ```

3. **Configurer les variables d'environnement :**
   Crée un fichier `.env` à la racine du projet.
   *(Note : Tu peux basculer entre l'instance Supabase locale et l'instance cloud selon ton besoin de test)* :

   ```
   # Pour le développement local :
   VITE_SUPABASE_URL=http://127.0.0.1:54321
   
   # Ou pour pointer vers l'instance cloud de test :
   # VITE_SUPABASE_URL=https://qbzoaxspaxgqlpjqsjyb.supabase.co
   
   VITE_SUPABASE_ANON_KEY=ta_cle_anon_supabase_ici
   
   ```

4. **Lancer le serveur de développement :**

   ```
   npm run dev
   
   ```

   L'application sera accessible localement sur l'adresse affichée dans ton terminal (généralement `http://localhost:5173`).

## 👥 Comptes de Test

Voici les trois profils types pré-configurés pour tester l'ensemble des fonctionnalités de l'application (Réservations, administration des membres, gestion des sites) :

### 1. Compte Administrateur (`Admin`)

* **Rôle :** Accès total (gestion globale, supervision des sites, choix des membres pour les réservations, etc.)

* **Email :** `admin.deskflow@yopmail.com`

* **Mot de passe :** `password123`

### 2. Compte Gestionnaire (`Gestionnaire`)

* **Rôle :** Gestion d'un site spécifique et des ressources associées.

* **Email :** `gestionnaire.deskflow@yopmail.com`

* **Mot de passe :** `password123`

### 3. Compte Membre (`Membre`)

* **Rôle :** Utilisateur classique rattaché à un site, gestion de son quota personnel et réservation de créneaux.

* **Email :** `membre.deskflow@yopmail.com`

* **Mot de passe :** `password123`

## 📂 Structure du Projet

* `/src/components` : Composants UI réutilisables (Modales, Overlays, Boutons, Inputs)

* `/src/pages` : Pages principales et tunnels d'onboarding

* `/src/stores` : Gestion d'état global avec Zustand

* `/src/lib` : Configuration du client Supabase