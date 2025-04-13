import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindUserInput } from './data-types/user.types';
import { User } from './data-types/user.schemas';
import { SignupInput } from 'src/config/auth/data-types/auth.types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(signupInput: SignupInput): Promise<User> {
    return this.userRepository.create(signupInput);
  }

  async findOne(findUserInput: FindUserInput): Promise<User | null> {
    return await this.userRepository.findOne(findUserInput);
  }

  async findOneByHabitId(habitId: string): Promise<User | null> {
    return await this.userRepository.findOneByHabitId(habitId);
  }
}
