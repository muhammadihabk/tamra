import { Injectable } from '@nestjs/common';
import { User } from './data-types/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findOne(inId: string): Promise<User | null> {
    const id = new Types.ObjectId(inId);
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      return null;
    }
    return user;
  }
}
