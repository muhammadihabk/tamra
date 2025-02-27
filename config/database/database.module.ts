import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseSeed } from './seed/database.seed';
import { habitLogModelName, habitSchema } from 'src/habit/data-types/habit.schemas';
import { userModelName, userSchema } from 'src/user/data-types/user.schemas';

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
    MongooseModule.forFeature([{ name: userModelName, schema: userSchema }]),
    MongooseModule.forFeature([{ name: habitLogModelName, schema: habitSchema }]),
  ],
  providers: [DatabaseSeed],
})
export class DatabaseModule {}
