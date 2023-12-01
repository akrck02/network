import { FriendStatus } from 'src/constants/friend';

export class FriendRequestUpdateDto {
  id: string;
  status: FriendStatus;
}
