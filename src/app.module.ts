import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NetworkController } from './controllers/network/network.controller';
import { NetworkModule } from './modules/network/network.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { FriendsModule } from './modules/friends/friends.module';
import { ChatController } from './controllers/chat/chat.controller';
import { BullModule } from '@nestjs/bull';
import { FriendRequestConsumer } from './jobs/consumers/friendRequestConsumer';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.NETWORK_DB}`,
      {
        authSource: process.env.MONGO_USERNAME,
        auth: {
          username: process.env.MONGO_USERNAME,
          password: process.env.MONGO_PASSWORD,
        },
      },
    ),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    BullModule.registerQueue({
      name: 'friendRequest',
      redis: {
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    NetworkModule,
    AuthModule.forRoot(),
    UsersModule,
    FriendsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    ChatController,
    NetworkController,
  ],
  providers: [AppService, FriendRequestConsumer],
})
export class AppModule {}
