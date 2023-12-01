import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendStatus } from 'src/constants/friend';
import { Friend } from 'src/models/schemas/friend';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<Friend>) {}

  /**
   * Find a friend by user id (from or to)
   * @param userId The id of the friend
   * @returns The friend if it exists
   */
  public async findOneByUser(userId: string): Promise<Friend> {
    const follower = await this.friendModel.findOne({
      from: userId,
      status: FriendStatus.ACCEPTED,
    });

    if (follower) {
      return follower;
    }

    const following = await this.friendModel.findOne({
      to: userId,
      status: FriendStatus.ACCEPTED,
    });
    return following;
  }

  /**
   * Find a friend by registry id
   * @param id The id of the friend registry
   * @returns The friend registry if it exists
   */
  public async findOne(id: string): Promise<Friend> {
    return this.friendModel.findOne({ _id: id, status: FriendStatus.ACCEPTED });
  }

  /**
   * Find all friends of a user
   * @param userId The id of the user
   * @returns The friends of the user
   */
  public async findUsersFriends(userId: string): Promise<Friend[]> {
    const following = await this.friendModel.find({
      from: userId,
      status: FriendStatus.ACCEPTED,
    });
    const followers = await this.friendModel.find({
      to: userId,
      status: FriendStatus.ACCEPTED,
    });

    const users = following.concat(followers);
    return users;
  }

  /**
   * Add a friend to a user
   * @param friend The friend to be added
   * @returns The friend if it exists
   */
  public async add(friend: Friend): Promise<Friend> {
    const newFriend = new this.friendModel(friend);
    return newFriend.save();
  }

  /**
   * Remove a friend
   * @param id The id of the friend
   * @returns True if the friend was removed
   */
  public async remove(id: string): Promise<boolean> {
    const result = await this.friendModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  /**
   * Find all pending friend requests of a user
   * @param userId The id of the user
   * @returns The pending friend requests of the user
   */
  public async findPendingFriendRequests(userId: string): Promise<Friend[]> {
    const pendingFriendRequests = await this.friendModel.find({
      to: userId,
      status: FriendStatus.PENDING,
    });
    return pendingFriendRequests;
  }

  /**
   * Update the status of a friend request
   * @param id The id of the friend request
   * @param status The new status of the friend request
   * @returns The updated friend request
   */
  public async updateFriendRequestStatus(
    id: string,
    status: FriendStatus,
  ): Promise<Friend> {
    const friend = await this.friendModel.findOne({ _id: id });
    friend.status = status;
    return friend.save();
  }
}
