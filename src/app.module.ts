import { Module } from '@nestjs/common';
import { HabitModule } from './habit/habit.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../config/database/database.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from 'config/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'config/graphql/schema.gql'),
    }),
    AuthModule,
    DatabaseModule,
    HabitModule,
    UserModule,
  ],
})
export class AppModule {}
