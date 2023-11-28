import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';
import { ApiError } from 'src/errors/apierror';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(user: any) {
    const error = UserValidationSchema.validate(user).error;
    if (error) {
      throw new ApiError(error.message, 400);
    }
    return user;
  }
}

const PASSWORD_REGEX = /[^a-zA-Z0-9]/g;
const PASSWORD_MIN_LENGTH = 16;
const PASSWORD_SPECIAL_CHARACTER_ERROR =
  'Password must have at least one especial character';
const PASSWORD_LOWERCASE_ERROR =
  'Password must have at least one lowercase and one uppercase character';

export const UserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(PASSWORD_MIN_LENGTH)
    .custom((value) => {
      // if no especial character, throw error
      if (!value.match(PASSWORD_REGEX)) {
        throw new ApiError(
          PASSWORD_SPECIAL_CHARACTER_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      }

      const lowcase = value.toLowerCase();
      const uppercase = value.toUpperCase();
      if (value === lowcase || value === uppercase) {
        throw new ApiError(PASSWORD_LOWERCASE_ERROR, HttpStatus.BAD_REQUEST);
      }
    })
    .required(),
  username: Joi.string().required(),
  type: Joi.number().min(0).max(1).default(0),
});
