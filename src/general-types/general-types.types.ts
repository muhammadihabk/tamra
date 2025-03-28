import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UpdateResponse {
  @Field()
  isSuccessful: boolean;

  @Field({ nullable: true })
  message?: string;
}
