import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { data } from './data';
import { User } from 'src/user/data-types/user.schemas';
import { HabitLog } from 'src/habit/data-types/habit.schemas';

@Injectable()
export class DbSeed implements OnApplicationBootstrap {
  constructor(
    @InjectModel(User.name) private userModel: any,
    @InjectModel(HabitLog.name) private habitLogModel: any,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const { users, habitsLogs } = await data();
    await this.userModel.deleteMany();
    await this.userModel.insertMany(users);
    await this.habitLogModel.deleteMany();
    await this.habitLogModel.insertMany(habitsLogs);
  }
}
