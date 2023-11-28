export enum UserErrors {
  USER_ALREADY_EXISTS = 'User already exists',
  USER_NOT_FOUND = 'User not found',
  PASSWORD_DOES_NOT_MATCH = 'Password does not match',
}

export enum AuthErrors {
  UNAUTHORIZED = 'Unauthorized',
  INVALID_TOKEN = 'Invalid token',
  TOKEN_EXPIRED = 'Token expired',
}
