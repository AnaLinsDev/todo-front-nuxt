<template>
  <v-app>
    <body>
      <MenuBar />
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
export default {
  name: "DefaultLayout",
  components: {MenuBar}
};
</script>
