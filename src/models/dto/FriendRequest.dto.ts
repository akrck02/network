import { User } from '../schemas/user';

export class FriendRequestDto {
  follower: User;
  following: User;
}
