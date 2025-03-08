import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FindUserResponse } from 'src/user/data-types/user.types';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => FindUserResponse)
  user: FindUserResponse;
}

@InputType()
export class SignupInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  picture: string;
}
