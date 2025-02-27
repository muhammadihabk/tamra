import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { habitsLogs, users } from './data';
import { habitLogModelName } from 'src/habit/data-types/habit.schemas';
import { userModelName } from 'src/user/data-types/user.schemas';

@Injectable()
export class DatabaseSeed implements OnApplicationBootstrap {
  constructor(
    @InjectModel(userModelName) private userModel: any,
    @InjectModel(habitLogModelName) private habitLogModel: any,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    await this.userModel.deleteMany();
    await this.userModel.insertMany(users);
    await this.habitLogModel.deleteMany();
    await this.habitLogModel.insertMany(habitsLogs);
  }
}
