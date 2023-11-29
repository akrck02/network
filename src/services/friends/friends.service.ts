import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend } from 'src/models/schemas/friend';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<Friend>) {}

  /**
   * Find a friend by id
   * @param id The id of the friend
   * @returns The friend if it exists
   */
  public async findOne(id: string): Promise<Friend> {
    const user = await this.friendModel.findOne({ _id: id });
    return user;
  }

  /**
   * Find all friends of a user
   * @param id The id of the user
   * @returns The friends of the user
   */
  public async findUsersFriends(id: string): Promise<Friend[]> {
    const user = await this.friendModel.find({ user: id });
    return user;
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
}
