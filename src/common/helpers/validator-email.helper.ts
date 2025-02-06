import validator from 'validator';

export function validatorEmail(email: string) {
  return validator.isEmail(email.toLowerCase().trim());
}
