<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar dense height="86px">
      <v-toolbar-title>TODO LIST APP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="goTo('/task/readAll')">
        <v-icon>mdi-playlist-check</v-icon>
      </v-btn>

      <v-menu offset-y transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list min-width="150px">
          <v-list-item key="profile" @click="goTo('/user/profile')">
            <v-list-item-title >
              Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item key="logout" @click="logout('/user/profile')">
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MenuBar",

  methods: {
    ...mapActions({
      logoutUser: "user/logout",
    }),
    goTo(to) {
      this.$router.push(to);
    },
    logout() {
      this.logoutUser()
      this.goTo("/login");
    },
  },
};
</script>
