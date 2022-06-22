<template>
  <v-app style="background: #E3E3EE">
    <!-- Side Navbar  -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-app-bar color="accent" dark depressed>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
        </router-link>
      </v-app-bar>

      <v-divider></v-divider>

      <!-- Side Navbar Links -->
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in sideNavItems"
            ripple
            :key="i"
            :to="item.link"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <!-- <v-list-item-title v-text="item.title"></v-list-item-title> -->
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>

          <!-- Signout Button -->
          <v-list-item v-if="user" @click="handleSignoutUser">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Signout
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Navbar  -->
    <v-app-bar app fixed color="primary" dark>
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        flex
        prepend-icon="mdi-magnify"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal navbar links -->
      <v-toolbar-items>
        <v-btn
          v-for="item in horizontalNavItems"
          class="hidden-xs-only"
          color="primary"
          depressed
          :key="item.title"
          :to="item.link"
        >
          <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!-- Profile Button -->
        <v-btn depressed to="/profile" v-if="user" color="primary">
          <v-icon class="hidden-sm-only" left>mdi-account-box</v-icon>
          <v-badge right color="blue darken-2" :value="0">
            <!-- <span slot="badge">1</span> -->
            Profile
          </v-badge>
        </v-btn>
        <!-- Signout Button -->
        <v-btn depressed color="primary" v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- App content -->
    <v-main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>

        <!-- Auth Snackbar -->
        <v-snackbar
          timeout="5000"
          color="success"
          bottom
          left
          v-model="authSnackbar"
        >
          <v-icon class="mr-3">mdi-check-circle</v-icon>
          <span>
            Vou are now signed in!
          </span>
          <v-btn dark text @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>

        <!-- Auth Error Snackbar -->
        <v-snackbar
          timeout="5000"
          color="info"
          bottom
          left
          v-if="authError"
          v-model="authErrorSnackbar"
        >
          <v-icon class="mr-3">mdi-cancel</v-icon>
          <span>
            {{ authError.message }}
          </span>
          <v-btn dark text to="/signin">Signin</v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    };
  },
  watch: {
    user(_, oldVal) {
      // if we have no value for user before, show snackbar
      if (oldVal === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      // If auth error is not null, show auth error snackbar
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["user", "authError"]),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [{ icon: "mdi-message-text", title: "Posts", link: "/posts" }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "mdi-message-text", title: "Posts", link: "/posts" },
          { icon: "mdi-star-circle", title: "Create Post", link: "/post/add" },
          { icon: "mdi-account-box", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
