import { ApiProperty } from '@nestjs/swagger';

export class GetFriendsDto {
  @ApiProperty({
    description: 'The user id',
  })
  user: string;
}
