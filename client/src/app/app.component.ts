import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const GRAPHQL_GET_WISHES_QUERY = gql`
  {
    getWishes {
      ambition
      isFulfilled
    }
  }
`;

const GRAPHQL_ADD_WISH_MUTATION = gql`
  mutation($ambition: String!) {
    makeWish(ambition: $ambition) {
      ambition
      isFulfilled
    }
  }
`;

const GRAPHQL_ON_WISH_ADDED_SUBSCRIPTION = gql`
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// tslint:disable: typedef
export class AppComponent {
  title = 'angular-gql-subscriptions';
  private query: QueryRef<any>;
  // ifAutoRefresh = false;
  myGroup: FormGroup;
  wishes = [];
  querySubscription;
  lastWish: any;
  lastUpdated: string;

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder // gqlService: ApplicationGraphQlService
  ) {
    // this.lastWish = gqlService.subscribe();
    // .toPromise()
    // .then((r) => {
    //   console.log('WHEN IN CONSTRUCTOR', r.data);
    // });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.initForm();
    this.initApollo();
    this.initSubscription();
  }

  private initForm() {
    this.myGroup = this.formBuilder.group({
      wishControl: this.formBuilder.control(''),
    });
  }

  private initApollo() {
    this.query = this.apollo.watchQuery({
      query: GRAPHQL_GET_WISHES_QUERY,
      // pollInterval: this.ifAutoRefresh ? 5000 : null, // Auto update data like for example dashboard
    });

    this.query.valueChanges.subscribe((result) => {
      this.wishes = result.data && result.data.getWishes;
      this.lastUpdated = new Date().toLocaleTimeString();
    });
  }

  private initSubscription() {
    if (this.query) {
      this.query.subscribeToMore({
        document: GRAPHQL_ON_WISH_ADDED_SUBSCRIPTION,
        updateQuery: async (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          } else {
            const newWish = subscriptionData.data;
            return newWish;
          }
        },
      });
    }
  }

  getWishStatus(isFulfilled) {
    return isFulfilled === true ? 'Fulfilled' : 'Not Fulfilled';
  }

  handleSubmit() {
    if (this.myGroup.controls.wishControl.value) {
      this.querySubscription = this.apollo
        .mutate({
          mutation: GRAPHQL_ADD_WISH_MUTATION,

          variables: {
            ambition: this.myGroup.controls.wishControl.value,
          },

          context: {
            useMultipart: true,
          },
        })
        .subscribe(({ data }) => {
          if (data) {
            const result: any = data;
            this.query.refetch(); // for instant UI update
          }
        });
    } else {
      alert('Please make a wish, not to be fulfilled, today.');
    }
  }

  handleKeySubmit(event) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }
}
