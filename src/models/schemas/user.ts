import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

enum UserType {
  FREE = 0,
  PREMIUM = 1,
}

const SALT_WORK_FACTOR = 10;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: Number,
    default: UserType.FREE,
    required: true,
  })
  type: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.hashPassword = hashPassword;
UserSchema.methods.validPassword = validPassword;

function hashPassword(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
}

// checking if password is valid
async function validPassword(password: string, password2: string) {
  return await bcrypt.compare(password, password2);
}
