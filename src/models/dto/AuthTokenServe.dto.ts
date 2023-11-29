import { UserType } from 'src/constants/user';

export class AuthTokenServeDto {
  access_token: string;
  user_type: UserType;
}
