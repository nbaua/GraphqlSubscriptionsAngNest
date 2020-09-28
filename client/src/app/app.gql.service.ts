import { Injectable } from '@angular/core';
import { Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ApplicationGraphQlService extends Subscription {
  document = gql`
    subscription {
      wishAdded {
        newWish {
          ambition
          isFulfilled
        }
        dateAdded
      }
    }
  `;
}
