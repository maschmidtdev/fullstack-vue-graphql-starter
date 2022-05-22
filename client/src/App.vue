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
      </v-toolbar-items>
    </v-app-bar>

    <!-- App content -->
    <v-main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    horizontalNavItems() {
      return [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
    },
    sideNavItems() {
      return [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
    }
  },
  methods: {
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
