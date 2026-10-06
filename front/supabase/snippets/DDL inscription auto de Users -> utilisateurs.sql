-- 1. Fonction de trigger avec des valeurs par défaut pour toutes les colonnes potentiellement NOT NULL
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.utilisateurs (
    id_utilisateur, 
    mail, 
    login, 
    role
  )
  values (
    new.id,
    new.email,
    -- Si aucun login n'est fourni, on prend la partie avant le '@' de l'email
    coalesce(new.raw_user_meta_data ->> 'login', split_part(new.email, '@', 1)),
    -- Si aucun rôle n'est fourni, on met 'Membre' par défaut (change selon tes contraintes)
    coalesce(new.raw_user_meta_data ->> 'role', 'Membre')
  )
  on conflict (id_utilisateur) do update 
  set mail = excluded.mail;
  
  return new;
end;
$$;

-- 2. Réassociation du Trigger
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();