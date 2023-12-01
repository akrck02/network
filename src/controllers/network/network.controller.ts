import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SecurityGuard } from 'src/auth/security-guard';
import { FriendStatus } from 'src/constants/friend';
import { FriendRequestDto } from 'src/models/dto/friendRequest.dto';
import { FriendRequestUpdateDto } from 'src/models/dto/friendRequestUpdate.dto';
import { GetFriendsDto } from 'src/models/dto/getFriend.dto';
import { FriendsService } from 'src/services/friends/friends.service';
import { NetworkService } from 'src/services/network/network.service';

@Controller('api/network')
export class NetworkController {
  constructor(
    private readonly networkService: NetworkService,
    private readonly friendsService: FriendsService,
  ) {}

  @Post('friend/request')
  @UseGuards(JwtAuthGuard, SecurityGuard)
  @ApiBearerAuth()
  public async friendRequest(@Body() body: FriendRequestDto) {
    return await this.networkService.friendRequest(body);
  }

  @Post('friend/request/accept')
  @UseGuards(JwtAuthGuard, SecurityGuard)
  @ApiBearerAuth()
  public async friendRequestAccept(@Body() request: FriendRequestUpdateDto) {
    request.status = FriendStatus.ACCEPTED;
    return await this.networkService.friendRequestUpdate(request);
  }

  @Post('friend/request/reject')
  @UseGuards(JwtAuthGuard, SecurityGuard)
  @ApiBearerAuth()
  public async friendRequestReject(@Body() request: FriendRequestUpdateDto) {
    request.status = FriendStatus.REJECTED;
    return await this.networkService.friendRequestUpdate(request);
  }

  @Post('friends/get/')
  @UseGuards(JwtAuthGuard, SecurityGuard)
  @ApiBearerAuth()
  public async getFriends(@Body() request: GetFriendsDto) {
    return await this.friendsService.findUsersFriends(request.user);
  }
}
