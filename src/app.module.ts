import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NetworkController } from './controllers/network/network.controller';
import { NetworkModule } from './modules/network/network.module';
import { AuthModule } from './modules/auth/auth.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { AuthController } from './controllers/auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
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
    NetworkModule,
    AuthModule,
    CryptoModule,
  ],
  controllers: [AppController, NetworkController, AuthController],
  providers: [AppService],
})
export class AppModule {}
