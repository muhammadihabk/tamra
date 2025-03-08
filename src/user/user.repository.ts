import { Injectable } from '@nestjs/common';
import { User } from './data-types/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { FindUserInput, FindUserInternalOutput } from './data-types/user.types';
import { SignupInput } from 'config/auth/data-types/auth.types';
import * as argon from 'argon2';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(
    findUserInput: FindUserInput,
  ): Promise<FindUserInternalOutput | null> {
    const { id, email } = findUserInput;
    let user;
    if (id) {
      user = await this.userModel
        .findOne({ _id: new Types.ObjectId(id) })
        .lean();
    } else if (email) {
      user = await this.userModel.findOne({ email }).lean();
    }

    if (!user) return null;

    const { _id, ...result } = user;

    return { id: _id, ...result };
  }

  async create(signupInput: SignupInput): Promise<FindUserInternalOutput> {
    const inUser = signupInput;
    const hashedPassword = await argon.hash(inUser.password);
    inUser.password = hashedPassword.toString();
    const user = (await this.userModel.create(inUser)).toObject();

    return { id: user._id, ...user };
  }
}
