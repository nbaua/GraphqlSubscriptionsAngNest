import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Wish {
  @Field()
  ambition: string; // wish description

  @Field()
  isFulfilled: boolean; // wish status
}

@ObjectType()
export class WishMetadata {
  @Field()
  newWish: Wish;
  @Field()
  dateAdded: Date;
}
