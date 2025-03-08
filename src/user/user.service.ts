import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindUserInput, FindUserInternalOutput } from './data-types/user.types';
import { SignupInput } from 'config/auth/data-types/auth.types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(
    findUserInput: FindUserInput,
  ): Promise<FindUserInternalOutput | null> {
    return await this.userRepository.findOne(findUserInput);
  }

  async create(signupInput: SignupInput): Promise<FindUserInternalOutput> {
    return this.userRepository.create(signupInput);
  }
}
