import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/schemas/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Find a user by id
   * @param id The id of the user
   * @returns The user if it exists
   */
  public async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  /**
   * Find a user by email
   * @param email The email of the user
   * @returns The user if it exists
   */
  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  /**
   * Find a user by username
   * @param username The username of the user
   * @returns The user if it exists
   */
  public async findOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }

  /**
   * Remove a user
   * @param id The id of the user
   * @returns True if the user was removed
   */
  public async remove(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  /**
   * Update a user
   * @param id The id of the user
   * @param user The user to be updated
   * @returns The updated user
   */
  public async update(id: string, user: any): Promise<User> {
    const result = await this.userModel.updateOne({ _id: id }, user);
    if (result.modifiedCount > 0) {
      return user;
    }
    return null;
  }

  /**
   * Update a user by email
   * @param email The email of the user
   * @param user The user to be updated
   * @returns The updated user
   */
  public async updateByEmail(email: string, user: any): Promise<User> {
    const result = await this.userModel.updateOne({ email: email }, user);
    if (result.modifiedCount > 0) {
      return user;
    }
    return null;
  }
}
