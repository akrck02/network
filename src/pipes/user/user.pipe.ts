import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
import { AuthErrors } from 'src/errors/errors';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(user: any) {
    const error = UserValidationSchema.validate(user).error;
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}

const PASSWORD_REGEX = /[^a-zA-Z0-9]/g;
const PASSWORD_MIN_LENGTH = 16;

export const UserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(PASSWORD_MIN_LENGTH)
    .custom((value) => {
      // if no especial character, throw error
      if (!value.match(PASSWORD_REGEX)) {
        throw new HttpException(
          AuthErrors.PASSWORD_SPECIAL_CHARACTER_MISSING,
          HttpStatus.BAD_REQUEST,
        );
      }

      const lowcase = value.toLowerCase();
      const uppercase = value.toUpperCase();
      if (value === lowcase || value === uppercase) {
        throw new HttpException(
          AuthErrors.PASSWORD_UPPERCASE_LOWERCASE_MISSING,
          HttpStatus.BAD_REQUEST,
        );
      }
    })
    .required(),
  username: Joi.string().required(),
  type: Joi.number().min(0).max(1).default(0),
});
