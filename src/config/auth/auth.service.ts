import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignupInput } from './data-types/auth.types';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (user && (await argon.verify(user.password, password))) {
      return { id: user.id };
    }

    return null;
  }

  async login(id: string) {
    if (id) {
      return {
        token: this.jwtService.sign({ sub: id }),
        user: await this.userService.findOne({ id }),
      };
    }

    throw new UnauthorizedException();
  }

  async signup(signupInput: SignupInput) {
    const user = await this.userService.create(signupInput);

    return {
      token: this.jwtService.sign({ sub: user.id }),
      user,
    };
  }
}
