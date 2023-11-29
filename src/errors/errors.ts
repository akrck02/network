export enum UserErrors {
  USER_ALREADY_EXISTS = 'User already exists',
  USER_NOT_FOUND = 'User not found',
  PASSWORD_DOES_NOT_MATCH = 'Password does not match',
}

export enum AuthErrors {
  UNAUTHORIZED = 'Unauthorized',
  INVALID_TOKEN = 'Invalid token',
  TOKEN_EXPIRED = 'Token expired',
  PASSWORD_SPECIAL_CHARACTER_MISSING = 'Password must have at least one especial character',
  PASSWORD_UPPERCASE_LOWERCASE_MISSING = 'Password must have at least one lowercase and one uppercase character',
}
