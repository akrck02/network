import { Body, Controller, Post } from '@nestjs/common';
import { FriendStatus } from 'src/constants/friend';
import { FriendRequestDto } from 'src/models/dto/friendRequest.dto';
import { FriendRequestUpdateDto } from 'src/models/dto/friendRequestUpdate.dto';
import { NetworkService } from 'src/services/network/network.service';

@Controller('api/network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Post('friend/request')
  public async friendRequest(@Body() request: FriendRequestDto) {
    return await this.networkService.friendRequest(request);
  }

  @Post('friend/request/accept')
  public async friendRequestAccept(@Body() request: FriendRequestUpdateDto) {
    request.status = FriendStatus.ACCEPTED;
    return await this.networkService.friendRequestUpdate(request);
  }

  @Post('friend/request/reject')
  public async friendRequestReject(@Body() request: FriendRequestUpdateDto) {
    request.status = FriendStatus.REJECTED;
    return await this.networkService.friendRequestUpdate(request);
  }
}
