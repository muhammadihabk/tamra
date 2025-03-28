import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlLocalAuthGuard } from './local-auth.guard';
import {
  LoginInput,
  LoginResponse,
  SignupInput,
} from './data-types/auth.types';

@Resolver()
export class AuthResolvers {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlLocalAuthGuard)
  async login(@Args('loginInput') _: LoginInput, @Context() context) {
    return await this.authService.login(context.req.user.id);
  }

  @Mutation(() => LoginResponse)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    return await this.authService.signup(signupInput);
  }
}
