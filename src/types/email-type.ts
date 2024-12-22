export type Email = string & { __brand: "Email" };

export function validateEmail(email: string): Email {
  const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validator.test(email)) {
    throw new Error("Formato de email incorrecto");
  }

  return email as Email;
}
