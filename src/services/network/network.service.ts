import { InjectQueue } from '@nestjs/bull';
import { HttpException, Injectable } from '@nestjs/common';
import * as Bull from 'bull';
import { FriendRequestJobType, Queue } from 'src/constants/queue';
import { FriendRequestDto } from 'src/models/dto/friendRequest.dto';
import { FriendRequestUpdateDto } from 'src/models/dto/friendRequestUpdate.dto';
import { Friend } from 'src/models/schemas/friend';

@Injectable()
export class NetworkService {
  constructor(
    @InjectQueue(Queue.FriendRequest) private friendRequestQueue: Bull.Queue,
  ) {}

  /**
   * Add a friend request using the job queue
   * @param request a friend request
   * @returns The friend registry
   * @throws HttpException if the job fails
   */
  public async friendRequest(request: FriendRequestDto): Promise<Friend> {
    const job = await this.friendRequestQueue.add(FriendRequestJobType.Add, {
      follower: request.follower,
      following: request.following,
    });

    const jobResult = await job.finished();
    if (this.isHttpException(jobResult)) {
      throw new HttpException(jobResult.message, jobResult.status);
    }

    return jobResult;
  }

  /**
   * Update a friend request using the job queue
   * @param request a friend request
   * @param accept accept or reject the friend request
   * @returns The friend registry
   * @throws HttpException if the job fails
   */
  public async friendRequestUpdate(
    request: FriendRequestUpdateDto,
  ): Promise<Friend> {
    const job = await this.friendRequestQueue.add(
      FriendRequestJobType.Update,
      request,
    );

    const jobResult = await job.finished();
    if (this.isHttpException(jobResult)) {
      throw new HttpException(jobResult.message, jobResult.status);
    }

    return jobResult;
  }

  /**
   * Check if the object is an HttpException
   * @param object object to check
   * @returns true if the object is an HttpException
   */
  private isHttpException(object): boolean {
    return object && object.status && object.message;
  }
}
