<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="d-flex flex-column justify-space-between pa-10" height="300">
      <h2>
        {{ text }} <br />
        {{ name }}
      </h2>
      <span class="d-flex justify-space-between">
        <v-btn class="error" @click="confirm">Confirm</v-btn>
        <v-btn text @click="cancel">
          Cancel
          <v-icon dark right> mdi-cancel </v-icon>
        </v-btn>
      </span>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalDeleteConfirm",
  props: {
    text: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    openDialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
    };
  },

  watch: {
    openDialog(n) {
      this.dialog = n;
    },
  },

  methods: {
    confirm() {
      this.$emit("confirm");
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    },
  },
};
</script>
