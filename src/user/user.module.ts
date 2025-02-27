import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModelName, userSchema } from './data-types/user.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: userModelName, schema: userSchema }]),
  ],
})
export class UserModule {}
