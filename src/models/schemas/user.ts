import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  type: number;

  @Prop()
  friends: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// hash the password
UserSchema.methods.generateHash = function (password) {
  return password;
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return password === this.password;
};
