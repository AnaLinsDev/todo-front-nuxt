<template>
  <v-alert
    :value="open"
    border="left"
    class="alert"
    prominent
    width="500"
    :type="type"
  >
    {{ text }}
  </v-alert>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AlertGlobal",

  computed: {
    ...mapState({
      type: (state) => state.alert.type,
      text: (state) => state.alert.text,
      open: (state) => state.alert.open,
    }),
  },

  watch: {
    open(n) {
      if (n) {
          setTimeout(this.close, 5000);
      }
    },
  },

  methods: {
    ...mapMutations({
      manage: "alert/manage",
    }),

    close() {
      this.manage({
        text: "",
        type: "error",
        open: false,
      });
    },
  },
};
</script>

<style>
.alert {
  position: fixed;
  margin: 50px calc(50% - 250px);
}

.shrink {
  position: relative;
}
</style>
