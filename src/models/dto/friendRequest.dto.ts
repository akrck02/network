import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestDto {
  @ApiProperty({
    description: 'The username of the user who sent the friend request',
  })
  follower: string;
  @ApiProperty({
    description: 'The username of the user who received the friend request',
  })
  following: string;
}
