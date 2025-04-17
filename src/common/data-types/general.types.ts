import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GeneralResponse {
  @Field()
  isSuccessful: boolean;

  @Field({ nullable: true })
  message?: string;
}
