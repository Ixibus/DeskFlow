-- 1. Table des SITES
CREATE TABLE sites (
    id_site SERIAL PRIMARY KEY,
    adresse TEXT NOT NULL,
    horaire_ouverture TIME NOT NULL,
    horaire_fermeture TIME NOT NULL,
    total_bureaux INT DEFAULT 0,
    total_salles INT DEFAULT 0
);

-- 2. Table des UTILISATEURS (reliée à auth.users de Supabase)
CREATE TABLE utilisateurs (
    id_utilisateur UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    login TEXT UNIQUE NOT NULL,
    mail TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('Admin', 'Gestionnaire', 'Membre')) NOT NULL DEFAULT 'Membre',
    quota INT DEFAULT 0 -- Quota d'heures par mois par exemple
);

-- 3. Table de liaison UTILISATEURS_SITES (site d'appartenance / gestion)
CREATE TABLE utilisateurs_sites (
    id_utilisateurs_sites SERIAL PRIMARY KEY,
    fk_utilisateurs UUID REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE,
    fk_sites INT REFERENCES sites(id_site) ON DELETE CASCADE
);

-- Ajoute une contrainte d'unicité sur fk_utilisateurs pour autoriser les upserts
ALTER TABLE public.utilisateurs_sites
ADD CONSTRAINT utilisateurs_sites_fk_utilisateurs_key UNIQUE (fk_utilisateurs);