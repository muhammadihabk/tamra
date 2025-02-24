import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
})
export class DatabaseModule {}
