import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ApiError } from 'src/errors/apierror';
import { UserErrors } from 'src/errors/auth';
import { UserRegisterDto } from 'src/models/dto/UserRegisterDto';
import { User } from 'src/models/schemas/user';
import { CryptoService } from '../crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly cryptService: CryptoService,
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
    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new ApiError(UserErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (!this.cryptService.compareBcrypt(password, user.password)) {
      throw new ApiError(
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
      password: userRegisterDTO.password,
      createdAt: new Date(),
    };

    // if user already exists, throw error
    if (
      await this.userModel.findOne({
        email: user.email,
      })
    ) {
      throw new ApiError(UserErrors.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    const createdUser = new this.userModel(user);
    await createdUser.save();
    return createdUser;
  }
}
