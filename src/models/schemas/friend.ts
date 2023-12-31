import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user';
import { FriendStatus } from 'src/constants/friend';

export type FriendDocument = HydratedDocument<Friend>;

@Schema({
  timestamps: true,
})
export class Friend {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  from: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  to: User;

  @Prop({ default: FriendStatus.PENDING })
  status: FriendStatus;

  @Prop({ type: mongoose.Schema.Types.String, required: false })
  chatId: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
