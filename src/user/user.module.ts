import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModelName, userSchema } from './data-shapes/user.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: userModelName, schema: userSchema }]),
  ],
})
export class UserModule {}
