import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';
import { Queue } from 'src/constants/queue';
import { NetworkController } from 'src/controllers/network/network.controller';
import { FriendRequestConsumer } from 'src/jobs/friendRequestConsumer';
import { NetworkService } from 'src/services/network/network.service';
import { FriendsModule } from '../friends/friends.module';
import { UsersModule } from '../users/users.module';

@Module({})
export class NetworkModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        BullModule.forRoot({
          redis: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
        }),
        BullModule.registerQueue({
          name: Queue.FriendRequest,
          redis: {
            port: +process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
          },
        }),
        FriendsModule,
        UsersModule,
      ],
      exports: [NetworkService],
      controllers: [NetworkController],
      providers: [NetworkService, FriendRequestConsumer],
      module: NetworkModule,
    };
  }
}
