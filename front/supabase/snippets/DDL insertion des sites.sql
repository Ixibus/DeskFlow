-- 1. Ajouter les colonnes nécessaires si elles n'existent pas encore
ALTER TABLE public.sites 
ADD COLUMN IF NOT EXISTS zip_code TEXT,
ADD COLUMN IF NOT EXISTS nom TEXT;

-- 2. Vider la table et réinitialiser les ID proprement
TRUNCATE TABLE public.sites RESTART IDENTITY CASCADE;

-- 3. Insérer les trois sites avec leur nom, adresse, zip_code et horaires
INSERT INTO public.sites (nom, adresse, zip_code, horaire_ouverture, horaire_fermeture, total_bureaux, total_salles)
VALUES 
  ('Le Sathonay', 'Place Sathonay', '69001 Lyon', '09:00', '23:00', 12, 3),
  ('Le Royale', 'Place Royale', '44000 Nantes', '08:30', '19:30', 18, 5),
  ('Le Capitole', 'Place du Capitole', '31000 Toulouse', '08:00', '20:00', 15, 4);