import { Module } from '@nestjs/common';
import { FriendChatGateway } from 'src/websockets/FriendChat.gateway';
import { FriendsModule } from '../friends/friends.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [FriendChatGateway],
  imports: [FriendsModule, UsersModule],
})
export class ChatModule {}
