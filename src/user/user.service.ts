import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindUserInput} from './data-types/user.types';
import { SignupInput } from 'config/auth/data-types/auth.types';
import { User } from './data-types/user.schemas';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(
    findUserInput: FindUserInput,
  ): Promise<User | null> {
    return await this.userRepository.findOne(findUserInput);
  }

  async create(signupInput: SignupInput): Promise<User> {
    return this.userRepository.create(signupInput);
  }
}
