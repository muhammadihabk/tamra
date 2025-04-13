import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/data-types/user.schemas';

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

  @Field(() => User)
  user: User;
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
