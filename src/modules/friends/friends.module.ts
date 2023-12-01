import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendSchema } from 'src/models/schemas/friend';
import { FriendsService } from 'src/services/friends/friends.service';

@Module({
  providers: [FriendsService],
  exports: [FriendsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Friend', schema: FriendSchema }]),
  ],
})
export class FriendsModule {}
