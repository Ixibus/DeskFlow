export interface ValidationErrors {
  email?: string;
  login?: string;
  password?: string;
  confirmPassword?: string;
  site?: string;
  formula?: string;
}

export function validateStep1(data: {
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Format d'email incorrect.";
  }

  // Login unique / requis
  if (!data.login || data.login.trim().length < 3) {
    errors.login = "Le login doit contenir au moins 3 caractères.";
  }

  // Mot de passe : 8 chars min, 1 maj, 1 min, 1 chiffre, 1 spécial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(data.password)) {
    errors.password =
      "Le mot de passe doit contenir 8 caractères min, une majuscule, une minuscule, un chiffre et un caractère spécial.";
  }

  // Confirmation mot de passe
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas.";
  }

  return errors;
}