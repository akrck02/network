import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FriendStatus } from 'src/constants/friend';

export class FriendRequestUpdateDto {
  @ApiProperty({
    description: 'The id of the friend request',
  })
  id: string;
  @ApiPropertyOptional({
    description: 'The status of the friend request',
    enum: [FriendStatus.ACCEPTED, FriendStatus.REJECTED],
  })
  status: FriendStatus;
}
