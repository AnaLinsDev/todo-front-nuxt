<template>
  <v-card class="mt-10 pa-8 mx-auto" max-width="1500px" >
    <h1>Board TODO</h1>

    <div class="mt-10">
      <v-data-table
        :headers="headers"
        :items="tasks"
        :items-per-page="15"
        max-height="80px"
        class="elevation-1 w-100"
      >
        <template v-slot:item.done="{ item }">
          <span v-if="item.done">DONE</span>
          <span v-else>TODO</span>
        </template>

        <template v-slot:item.remember="{ item }">
          <span v-if="item.remember">Yes</span>
          <span v-else>No</span>
        </template>

        <template v-slot:item.info="{ item }">
          <span>
            <v-btn icon>
              <v-icon color="info"> mdi-information-outline  </v-icon>
            </v-btn>
          </span>
        </template>

        <template v-slot:item.edit="{ item }">
          <span>
            <v-btn icon>
              <v-icon color="warning"> mdi-pencil-outline </v-icon>
            </v-btn>
          </span>
        </template>

        <template v-slot:item.delete="{ item }">
          <span>
            <v-btn icon>
              <v-icon color="error"> mdi-delete-outline  </v-icon>
            </v-btn>
          </span>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      tasks: [],
      headers: [
        { text: "Title", value: "title" },
        { text: "Status", value: "done" },
        { text: "Should Remember", value: "remember" },
        { text: "Info", value: "info" },
        { text: "Edit", value: "edit" },
        { text: "Delete", value: "delete" },
      ],
    };
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    ...mapActions({
      readAll: "task/getTasksByUserId",
      deleteTask: "task/delete",
      getCurrentUser: "user/getCurrentUser",
    }),

    async getTasks() {
      console.log("getTasks");
      let idUser = -1;
      await this.getCurrentUser().then((resp) => (idUser = resp.id));
      if (idUser > -1) {
        this.readAll(idUser).then((resp) => {
          this.tasks = resp;
        });
      }
    },
  },
};
</script>

<style></style>
