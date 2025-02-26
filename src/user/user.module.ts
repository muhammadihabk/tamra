import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modelName, userSchema } from './data-shapes/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: modelName, schema: userSchema }]),
  ],
})
export class UserModule {}
