# DeskFlow - Application de Gestion et de Réservation de Coworking

DeskFlow est une application web permettant de gérer des espaces de coworking, des sites, des ressources (bureaux, salles de réunion) et des réservations avec une gestion des quotas et des rôles utilisateurs.

React | CSS Vanilla | Supabase

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

* **Node.js** (version 18 ou supérieure recommandée)

* **npm** (ou un gestionnaire de paquets équivalent comme `pnpm` ou `yarn`)

* *(Optionnel)* **Supabase CLI** pour faire tourner l'instance Supabase en local pour le test de mot de passe oublié ou de confirmation de création de compte.

## Branche de démo

   ```
   `demo`
   
   ```

## Installation et Lancement en Local

1. **Cloner le dépôt Git :**

   ```
   git clone <URL_DU_REPO>
   cd front
   
   ```

2. **Installer les dépendances :**

   ```
   npm install
   
   ```

3. **Configurer les variables d'environnement :**
   Crée un fichier `.env` à la racine du projet.

   ```
   # Pour le développement local (Supabase CLI):
      ######## test mail de confirmation mailpit
      VITE_SUPABASE_URL=http://127.0.0.1:54321
      VITE_SUPABASE_ANON_KEY=cle_anon_supabaseLocal

   
   # Ou pour pointer vers l'instance cloud (Supabase "Saas"):
      ######## dev SupaBase en Saas
      VITE_SUPABASE_URL=https://qbzoaxspaxgqlpjqsjyb.supabase.co
      VITE_SUPABASE_ANON_KEY=cle_anon_supabase
   
   ```

4. **Lancer le serveur de développement :**

   ```
   npm run dev
   
   ```

   L'application sera accessible localement sur l'adresse affichée dans le terminal (`http://localhost:5173`).

5. **Démarrage setup Supabase CLI**
   
   ```
   # démarrage du serveur Supabase CLI
   npx supabase start

   # accès interface client base de données de Supabase CLI
   `http://127.0.0.1:54323`

   # accès interface client boite mail Mailpit
   `http://127.0.0.1:54324`

   ```

## Comptes de Test

Voici les trois profils types pré-configurés pour tester l'ensemble des fonctionnalités de l'application (Réservations, administration des membres, gestion des sites) :

### 1. Compte Administrateur (`Admin`)

* **Rôle :** Accès total (gestion globale, supervision des sites, choix des membres pour les réservations, etc.)

* **Login :** `admin`

* **Email :** `admin@deskflow.com`

* **Mot de passe :** `AdminDeskflow01!!`

### 2. Compte Gestionnaires (`Gestionnaire`)

* **Rôle :** Gestion d'un site spécifique et des ressources associées (Lyon, Nantes et Toulouse).

* **Login :** `gestionnaire.sathonay@deskflow.com`, `gestionnaire.royale@deskflow.com` et `gestionnaire.capitole@deskflow.com`

* **Email :** `gestionnaire.sathonay@deskflow.com`, `gestionnaire.royale@deskflow.com` et `gestionnaire.capitole@deskflow.com`

* **Mot de passe :** `GestionnaireDeskflowLyon01!!`, `GestionnaireDeskflowNantes01!!` et `GestionnaireDeskflowToulouse01!!`

### 3. Compte Membre (`Membre`)

* **Rôle :** Utilisateur classique rattaché à un site, gestion de son quota personnel et réservation de créneaux.

* **Login :** `test01`

* **Email :** `test01@lemail.com`

* **Mot de passe :** `Test01!!`

## Structure du Projet

* `/src/components` : composants UI réutilisables (Modales, Overlays, Boutons, Inputs)

* `/src/pages` : pages principales et tunnels d'onboarding

* `/src/stores` : gestion d'état global avec Zustand

* `/src/lib` : configuration du client Supabase

* `/src/views` : Design system

* `/src/utils` : fonctions "Helper"

* `/src/style` : styles réutilisables

* `/src/services` : fonctions "Checker"

* `/src/route` : fichiers de "routing" de l'application

* `/src/assets` : médias (photos et icones)