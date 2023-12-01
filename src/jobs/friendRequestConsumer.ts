import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueFailed,
  OnQueueWaiting,
} from '@nestjs/bull';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Job } from 'bull';
import { FriendStatus } from 'src/constants/friend';
import { FriendRequestJobType, Queue } from 'src/constants/queue';
import { FriendErrors } from 'src/errors/errors';
import { FriendRequestDto } from 'src/models/dto/friendRequest.dto';
import { FriendRequestUpdateDto } from 'src/models/dto/friendRequestUpdate.dto';
import { Friend } from 'src/models/schemas/friend';
import { FriendsService } from 'src/services/friends/friends.service';
import { UsersService } from 'src/services/users/users.service';

@Processor(Queue.FriendRequest)
export class FriendRequestConsumer {
  constructor(
    private readonly friendsService: FriendsService,
    private readonly usersService: UsersService,
  ) {}

  @OnQueueWaiting()
  onWaiting(job: Job) {
    console.log(`Waiting job ${job.id} of type "${job.name}"`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type "${job.name}"`);

    return job;
  }

  @OnQueueFailed()
  async onFailed(job: Job, error: Error) {
    console.error(
      `Job ${job.id} of type ${job.name} failed with error ${error}`,
    );
  }

  @Process(FriendRequestJobType.Add)
  async add(job: Job<unknown>): Promise<Friend | HttpException> {
    return await this.addFriendRequest(job.data as FriendRequestDto);
  }

  @Process(FriendRequestJobType.Update)
  async update(job: Job<unknown>): Promise<boolean | HttpException> {
    return await this.updateFriendRequest(job.data as FriendRequestUpdateDto);
  }

  /**
   * Add a friend request
   * @param data a friend request
   * @returns Friend registry or HttpException
   */
  async addFriendRequest(
    data: FriendRequestDto,
  ): Promise<Friend | HttpException> {
    const follower = await this.usersService.findOne(data.follower);
    const following = await this.usersService.findOne(data.following);

    const existing = await this.friendsService.findPendingFriendRequest(
      data.follower,
      data.following,
    );

    if (existing) {
      return new HttpException(
        FriendErrors.FRIEND_REQUEST_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const registry = await this.friendsService.add({
      from: follower,
      to: following,
      status: FriendStatus.PENDING,
    });

    registry.from.password = undefined;
    registry.to.password = undefined;
    return registry;
  }

  /**
   * Update a friend request
   * @param data a friend request
   * @returns Friend registry if accepted, or HttpException
   */
  async updateFriendRequest(
    data: FriendRequestUpdateDto,
  ): Promise<HttpException> {
    switch (data.status) {
      case FriendStatus.ACCEPTED:
        const friend = await this.friendsService.updateFriendRequestStatus(
          data.id,
          data.status,
        );

        if (!friend) {
          return new HttpException(
            FriendErrors.FRIEND_REQUEST_NOT_FOUND,
            HttpStatus.NOT_FOUND,
          );
        }
        break;
      case FriendStatus.REJECTED:
        const removed = await this.friendsService.remove(data.id);

        if (!removed) {
          return new HttpException(
            FriendErrors.FRIEND_REQUEST_NOT_FOUND,
            HttpStatus.NOT_FOUND,
          );
        }
        break;
      default:
        return new HttpException(
          FriendErrors.FRIEND_REQUEST_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
    }
  }
}
