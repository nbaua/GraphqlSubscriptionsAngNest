import { Injectable } from '@nestjs/common';
import { Wish } from './wish.model';

@Injectable()
export class WishService {
  private wishes: Wish[];

  constructor() {
    this.wishes = new Array<Wish>();
  }

  getAllWishes() {
    return this.wishes;
  }

  makeWish(ambition: string): Wish | PromiseLike<Wish> {
    let wish = new Wish();
    wish.ambition = ambition;
    wish.isFulfilled = false;

    this.wishes.push(wish);

    return wish;
  }
}
