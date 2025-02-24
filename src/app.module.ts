import { Module } from '@nestjs/common';
import { HabitModule } from './habit/habit.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../config/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HabitModule,
    DatabaseModule,
  ],
})
export class AppModule {}
