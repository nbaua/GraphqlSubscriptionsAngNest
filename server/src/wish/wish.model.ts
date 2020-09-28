import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Wish {
  @Field()
  ambition: string; // wish description

  @Field()
  isFulfilled: boolean; // wish status
}

@ObjectType('WishMetadata')
export class WishMetadata {
  @Field(type => Wish)
  newWish: Wish;
  @Field()
  dateAdded: Date;
}
