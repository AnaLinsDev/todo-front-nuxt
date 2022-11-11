<template>
  <v-dialog v-model="dialog" max-width="1000">
    <v-card class="d-flex flex-column justify-space-between pa-10">
      <span class="d-flex">
        <h2>Task</h2>
        <v-spacer></v-spacer>
        <v-btn text @click="close" icon> <v-icon>mdi-close</v-icon> </v-btn>
      </span>
      <v-card :loading="loadingData" elevation="0">
        <span class="mt-6">
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-row class="ma-0">
              <v-col class="py-0">
                <label for="title">Title *</label>
                <v-text-field
                  v-model="taskAdded.title"
                  placeholder="Title"
                  :rules="[rules.required]"
                  solo
                />
              </v-col>
              <v-col class="py-0">
                <label for="Remember">Todo Until Date *</label>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      :rules="[rules.required]"
                      solo
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="py-0">
                <label for="Remember">Todo Until Time *</label>
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :rules="[rules.required]"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      readonly
                      :rules="[rules.required]"
                      solo
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="time"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col class="py-0">
                <label for="Remember">Status *</label>
                <v-radio-group v-model="taskAdded.done" row>
                  <v-radio
                    v-for="n in [
                      { value: false, text: 'TODO' },
                      { value: true, text: 'DONE' },
                    ]"
                    :key="n.value"
                    :rules="[rules.required]"
                    :label="`${n.text}`"
                    :value="n.value"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col class="py-0">
                <label for="Remember">Remember me *</label>
                <v-radio-group v-model="taskAdded.remember" row>
                  <v-radio
                    v-for="n in [
                      { value: true, text: 'Yes' },
                      { value: false, text: 'No' },
                    ]"
                    :key="n.value"
                    :rules="[rules.required]"
                    :label="`${n.text}`"
                    :value="n.value"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col></v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col class="py-0">
                <label for="description">Description *</label>
                <v-textarea
                  v-model="taskAdded.description"
                  solo
                  :rules="[rules.required]"
                  name="input-7-4"
                  label="Description"
                />
              </v-col>
            </v-row>
            </v-form>
          </v-container>
        </span>
      </v-card>
      <span class="d-flex justify-space-between">
        <v-btn text @click="reset"> Reset </v-btn>
        <v-btn class="success" :disabled="!valid" @click="confirm"> Save </v-btn>
      </span>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import MixinRules from "@/mixins/MixinRules.vue";

export default {
  name: "ModalInfoTask",
  mixins: [MixinRules],
  props: {
    task: {
      type: Object,
      default: () => {},
    },
    openDialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
      menu: false,
      menu2: false,
      valid: true,
      date: "",
      time: "",
      defaultTask: {},
      taskAdded: {},
      loadingData: false,
    };
  },

  computed: {
    didUpdate() {
      return !this.isEqualsJson(this.defaultTask, this.taskAdded);
    },
  },

  watch: {
    openDialog(n) {
      this.dialog = n;

      if (n) {
        this.loadingData = true;

        this.defaultTask = {
          title: "",
          description: "",
          remember: null,
          doneOnTime: null,
          done: null,
          closedAt: null,
          todoUntil: null,
        };

        this.loadingData = false;
        this.reset();
      }
    },

    date(n) {
      if (n !== "" && this.time !== "") {
        this.mountDateTime();
      }
    },

    time(n) {
      if (n !== "" && this.date !== "") {
        this.mountDateTime();
      }
    },
  },

  methods: {
    ...mapActions({
      addTask: "task/create",
    }),

    prepareRequest(task) {
      for (const t in task) {
        if (task[t] === null) {
          delete task[t];
        }
      }
      return task;
    },

    async confirm() {
      const task = this.prepareRequest(this.taskAdded);
      await this.addTask(task)
      this.$emit("close");
    },
    

    close() {
      this.date = "";
      this.time = "";
      this.taskAdded = Object.assign({}, this.defaultTask);
      this.$emit("close");
    },

    reset() {
      this.date = "";
      this.time = "";
      this.taskAdded = Object.assign({}, this.defaultTask);
    },

    getDateTime() {
      this.date = this.defaultTask.todoUntil.split("T")[0];
      this.time = this.defaultTask.todoUntil.split("T")[1].split(".")[0];
    },

    mountDateTime() {
      const dateTimeEnd = this.defaultTask.todoUntil
        ? this.defaultTask.todoUntil.split("T")[1].split(".")[1]
        : "000Z";
      const newDateTime = this.date + "T" + this.time + ":00." + dateTimeEnd;
      this.taskAdded.todoUntil = newDateTime;
    },

    isEqualsJson(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      return (
        keys1.length === keys2.length &&
        Object.keys(obj1).every((key) => obj1[key] == obj2[key])
      );
    },
  },
};
</script>

<style scoped>
label {
  font-size: 18px;
}
</style>
