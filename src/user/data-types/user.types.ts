import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from './user.schemas';

export type FindUserInput = {
  id?: string;
  email?: string;
};

@ObjectType()
export class FindUserInternalOutput extends OmitType(User, ['_id'] as const) {
  @Field()
  id: string;
}

@ObjectType()
export class FindUserResponse extends OmitType(FindUserInternalOutput, [
  'password',
] as const) {}
