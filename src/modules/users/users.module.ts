import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/schemas/user';
import { UsersService } from 'src/services/users/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class UsersModule {}
