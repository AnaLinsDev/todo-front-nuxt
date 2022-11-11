<template>
  <v-app>
    <body>
      <AlertGlobal />
      <MenuBar v-if="loggedIn" />
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </body>
  </v-app>
</template>

<script>
import MenuBar from '../components/MenuBar.vue'
import AlertGlobal from '../components/AlertGlobal.vue'
import { mapState } from "vuex";

export default {
  name: "DefaultLayout",
  components: {MenuBar},


computed: {
  ...mapState({
      loggedIn: state => state.user.loggedIn,
    }),
},

};
</script>
