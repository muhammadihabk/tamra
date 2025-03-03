import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './data-types/user.schemas';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(id: string): Promise<User | null> {
  return await this.userRepository.findOne(id);
  }
}
