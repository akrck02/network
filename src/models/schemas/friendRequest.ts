import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user';

export type FriendRequestDocument = HydratedDocument<FriendRequest>;

@Schema()
export class FriendRequest {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: FriendRequest.name })
  id: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  from: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  to: Types.ObjectId;
  @Prop()
  state: number;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
