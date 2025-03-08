import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserResponse } from 'src/user/data-types/user.types';
import { UserService } from 'src/user/user.service';
import { SignupInput } from './data-types/auth.types';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<FindUserResponse | null> {
    const user = await this.userService.findOne({ email });
    if (user && (await argon.verify(user.password, password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: FindUserResponse) {
    if (user) {
      return {
        token: this.jwtService.sign({ sub: user.id, email: user.email }),
        user,
      };
    }

    throw new UnauthorizedException();
  }

  async signup(signupInput: SignupInput) {
    const user = await this.userService.create(signupInput);

    return {
      token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user,
    };
  }
}
