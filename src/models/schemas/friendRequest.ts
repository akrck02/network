import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user';

export type FriendRequestDocument = HydratedDocument<FriendRequest>;

@Schema({
  timestamps: true,
})
export class FriendRequest {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  from: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  to: User;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
