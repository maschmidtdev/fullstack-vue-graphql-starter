<template>
  <v-container grid-list-xl fluid>
    <!-- Post Cards -->
    <v-layout row wrap v-if="infiniteScrollPosts">
      <v-flex
        xs12
        sm6
        v-for="post in infiniteScrollPosts.posts"
        :key="post._id"
      >
        <v-card hover>
          <v-card-media :src="post.imageUrl" height="30vh" lazy />
          <v-card-actions>
            <v-card-title primary>
              <div>
                <div class="headline">{{ post.title }}</div>
                <div class="grey--text">
                  {{ post.likes }} likes - {{ post.messages.length }} comments
                </div>
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showPostCreator = !showPostCreator">
              <v-icon>{{
                `mdi-chevron-${showPostCreator ? "up" : "down"}`
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <!-- Post creator -->
          <v-slide-y-transition>
            <v-card-text v-show="showPostCreator" class="grey lighten-4">
              <v-list-item avatar>
                <v-list-item-avatar>
                  <img :src="post.createdBy.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text--primary">{{
                    post.createdBy.username
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-thin">
                    <!-- TODO: format date -->
                    Added {{ post.createdDate }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-actionn>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                  </v-btn>
                </v-list-item-actionn>
              </v-list-item>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Fetch More Button -->
    <v-layout column>
      <v-flex xs12>
        <v-layout justify-center row>
          <v-btn
            @click="showMorePosts"
            color="info"
            :disabled="!showMoreEnabled"
            >Fetch More</v-btn
          >
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from "../../queries";

const pageSize = 2;

export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true,
      showPostCreator: false
    };
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMorePosts() {
      this.pageNum += 1;
      // Fetch more data and transform original result
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          // pageNum incremented by 1
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
          this.showMoreEnabled = hasMore;

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              // Merge previous posts with new posts
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          };
        }
      });
    }
  }
};
</script>
