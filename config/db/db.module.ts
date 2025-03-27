import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DbSeed } from './seed/db.seed';
import { HabitLog, HabitLogSchema } from 'src/habit/data-types/habit.schemas';
import { User, UserSchema } from 'src/user/data-types/user.schemas';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `mongodb://${configService.get('MONGO_INITDB_ROOT_USERNAME')}:${configService.get('MONGO_INITDB_ROOT_PASSWORD')}@mongodb:27017/${configService.get('MONGO_INITDB_DATABASE')}?authSource=admin`,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: HabitLog.name, schema: HabitLogSchema },
    ]),
  ],
  providers: [DbSeed],
})
export class DbModule {}
