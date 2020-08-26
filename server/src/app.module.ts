import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WishModule } from './wish/wish.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
    WishModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
