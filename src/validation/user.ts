import * as Joi from 'joi';

export const UserSchemaJoi = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(16).alphanum().required(),
  username: Joi.string().required(),
  type: Joi.number().min(0).max(1).required(),
});

export function isMail(email: string): boolean {
  const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return MAIL_REGEX.test(email);
}

export function isPassword(password: string): boolean {
  const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{16,}$/g;
  return PASSWORD_REGEX.test(password);
}
