import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GqlLocalAuthGuard } from './local-auth.guard';
import { AuthResolvers } from './auth.resolvers';
import { JwtStrategy } from './jwt.strategy';
import { GqlJwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolvers, AuthService, LocalStrategy, GqlLocalAuthGuard, JwtStrategy, GqlJwtAuthGuard],
})
export class AuthModule {}
