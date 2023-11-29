import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserErrors } from 'src/errors/errors';
import { UserRegisterDto } from 'src/models/dto/UserRegister.dto';
import { User, UserSchema } from 'src/models/schemas/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login a user
   * @param user The user to be registered
   * @returns The updated auth JWT token
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * validate a user by email and password
   * @param email The email of the user
   * @param password The password of the user
   * @returns The user if it exists
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new HttpException(UserErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const validPassword: boolean = await UserSchema.methods.validPassword(
      password,
      user.password,
    );
    if (!validPassword) {
      throw new HttpException(
        UserErrors.PASSWORD_DOES_NOT_MATCH,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  /**
   * Register a user
   * @param userRegisterDTO The user to be registered
   * @returns The created user
   */
  async register(userRegisterDTO: UserRegisterDto): Promise<User> {
    const user = {
      username: userRegisterDTO.username,
      email: userRegisterDTO.email,
      password: UserSchema.methods.hashPassword(userRegisterDTO.password),
      createdAt: new Date(),
    };

    // if user already exists, throw error
    if (
      await this.userModel.findOne({
        email: user.email,
      })
    ) {
      throw new HttpException(
        UserErrors.USER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const createdUser = new this.userModel(user);
    await createdUser.save();
    return createdUser;
  }
}
