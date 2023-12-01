import { User } from '../schemas/user';

export class AuthTokenServeDto {
  access_token: string;
  user: User;
}
