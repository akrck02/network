import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user';

export type FriendDocument = HydratedDocument<Friend>;

@Schema({
  timestamps: true,
})
export class Friend {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  from: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  to: User;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
