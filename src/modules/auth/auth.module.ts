import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/services/auth/auth.service';
import { CryptoModule } from '../crypto/crypto.module';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/models/schemas/user';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [
    AuthService,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CryptoModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
})
export class AuthModule {}
