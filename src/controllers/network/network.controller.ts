import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { FriendRequestDto } from 'src/models/dto/FriendRequest.dto';

@Controller('api/network')
export class NetworkController {
  constructor(
    @InjectQueue('friendRequest') private friendRequestQueue: Queue,
  ) {}

  @Post('friend/request')
  public async friendRequest(@Body() request: FriendRequestDto) {
    console.log(request);

    const job = this.friendRequestQueue.add({
      follower: request.follower,
      following: request.following,
    });

    
  }
}
