import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Wish, WishMetadata } from './wish.model';
import { WishService } from './wish.service';

const pubSub = new PubSub();

@Resolver(of => Wish)
export class WishResolver {
  constructor(@Inject(WishService) private wishService: WishService) {}

  @Query(returns => [Wish])
  async getWishes() {
    return this.wishService.getAllWishes();
  }

  @Mutation(returns => Wish)
  async makeWish(@Args('ambition') ambition: string): Promise<Wish> {
    const newWish = await this.wishService.makeWish(ambition);
    pubSub.publish('wishAdded', {
      wishAdded: { newWish, dateAdded: new Date() },
    });
    return newWish;
  }

  @Subscription(returns => WishMetadata, {
    name: 'wishAdded',
    defaultValue: null,
    nullable: true,
  })
  wishAdded() {
    return pubSub.asyncIterator('wishAdded');
  }
}
