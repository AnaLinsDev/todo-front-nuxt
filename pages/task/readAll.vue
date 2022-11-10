<template>
  <v-card class="mt-10 pa-8 mx-auto" max-width="1500px">
    <ModalDeleteConfirm
      :open-dialog="modalDelete"
      text="Task"
      :name="selectedTask.title"
      @confirm="deleteT"
      @close="modalDelete = false"
    />

    <ModalInfoTask
      :open-dialog="modalInfo"
      :task="selectedTask"
      @close="closeModalInfo"
    />

    <ModalAddTask
      :open-dialog="modalAdd"
      @close="closeModalAdd"
    />

    <div class="d-flex">
      <h1>TODO Board</h1>
      <v-spacer></v-spacer>
      <v-btn color="success" icon @click="actionClicked({}, 'add')">
        <v-icon>mdi-text-box-plus-outline</v-icon>
      </v-btn>
    </div>

    <div class="mt-10">
      <v-data-table
        :headers="headers"
        :items="tasks"
        :items-per-page="10"
        max-height="80px"
        class="elevation-1 w-100"
      >
        <template v-slot:[`item.done`]="{ item }">
          <span v-if="item.done">DONE</span>
          <span v-else>TODO</span>
        </template>

        <template v-slot:[`item.remember`]="{ item }">
          <span v-if="item.remember">Yes</span>
          <span v-else>No</span>
        </template>

        <template v-slot:[`item.info`]="{ item }">
          <span>
            <v-btn icon @click="actionClicked(item, 'info')">
              <v-icon color="info"> mdi-information-outline </v-icon>
            </v-btn>
          </span>
        </template>

        <template v-slot:[`item.delete`]="{ item }">
          <span>
            <v-btn icon @click="actionClicked(item, 'delete')">
              <v-icon color="error"> mdi-delete-outline </v-icon>
            </v-btn>
          </span>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import ModalInfoTask from "../../components/task/ModalInfoTask.vue";
import ModalAddTask from "../../components/task/ModalAddTask.vue";

export default {
  components: { ModalInfoTask, ModalAddTask },
  data() {
    return {
      tasks: [],
      modalDelete: false,
      modalAdd: false,
      modalInfo: false,
      selectedTask: {},
      headers: [
        { text: "Title", value: "title", width: "180" },
        { text: "Status", value: "done" },
        { text: "Should Remember", value: "remember" },
        { text: "Info", value: "info" },
        { text: "Delete", value: "delete" },
      ],
    };
  },

  mounted() {
    this.loadData()
  },

  methods: {
    ...mapActions({
      readAll: "task/getTasksByUserId",
      deleteTask: "task/delete",
      getCurrentUser: "user/getCurrentUser",
    }),

    loadData() {
      this.readAll().then((resp) => this.tasks = resp)
    },

    closeModalAdd() {
      this.modalAdd = false
      this.loadData()
    },

    closeModalInfo() {
      this.modalInfo = false
      this.loadData()
    },

    async getTasks() {
      let idUser = -1;
      await this.getCurrentUser().then((resp) => (idUser = resp.id));
      if (idUser > -1) {
        this.readAll(idUser).then((resp) => {
          this.tasks = resp;
        });
      }
    },

    actionClicked(item, action) {
      this.selectedTask = Object.assign({}, item);
      switch (action) {
        case "info":
          this.modalInfo = true;
          break;
        case "add":
          this.modalAdd = true;
          break;
        case "delete":
          this.modalDelete = true;
          break;
      }
    },

    async deleteT() {
      await this.deleteTask(this.selectedTask)
      this.loadData()
    }
  },
};
</script>

<style></style>
