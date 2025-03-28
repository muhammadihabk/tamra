import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './data-types/user.schemas';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserResolvers } from './user.resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolvers, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
