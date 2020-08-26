import { Module } from '@nestjs/common';
import { WishResolver } from './wish.resolver';
import { WishService } from './wish.service';

@Module({
  providers: [WishResolver, WishService]
})
export class WishModule {}
