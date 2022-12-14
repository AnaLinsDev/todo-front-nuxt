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
                    v-model="taskEdited.title"
                    :rules="[rules.required]"
                    placeholder="Title"
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
                        :rules="[rules.required]"
                        readonly
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
                        :rules="[rules.required]"
                        readonly
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
                  <v-radio-group v-model="taskEdited.done" row>
                    <v-radio
                      v-for="n in [
                        { value: false, text: 'TODO' },
                        { value: true, text: 'DONE' },
                      ]"
                      :rules="[rules.required]"
                      :key="n.value"
                      :label="`${n.text}`"
                      :value="n.value"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col class="py-0">
                  <label for="Remember">Remember me *</label>
                  <v-radio-group v-model="taskEdited.remember" row>
                    <v-radio
                      v-for="n in [
                        { value: true, text: 'Yes' },
                        { value: false, text: 'No' },
                      ]"
                      :rules="[rules.required]"
                      :key="n.value"
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
                    v-model="taskEdited.description"
                    solo
                    :rules="[rules.required]"
                    name="input-7-4"
                    label="Solo textarea"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </span>
      </v-card>
      <span class="d-flex justify-space-between">
        <v-btn text @click="reset"> Reset </v-btn>
        <v-btn class="success" :disabled="!shouldShow" @click="confirm">
          Save
        </v-btn>
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
      taskEdited: {},
      loadingData: false,
    };
  },

  computed: {
    didUpdate() {
      const jsonNotEqual = !this.isEqualsJson(this.defaultTask, this.taskEdited);
      const dateTimeNotEqual = this.dateTimeChanged
      return jsonNotEqual || dateTimeNotEqual
    },

    shouldShow() {
      return this.didUpdate && this.valid
    },

    dateTimeChanged() {
      if (this.defaultTask.todoUntil) {
        const date = this.defaultTask.todoUntil.split("T")[0];
        let time = this.defaultTask.todoUntil.split("T")[1].split(".")[0];
        const aux = time.split(':')
        time = aux[0] + ':' + aux[1]
        return this.date !== date || this.time !== time
      }
    }
  },

  watch: {
    async openDialog(n) {
      this.dialog = n;

      if (n) {
        this.loadingData = true;
        await this.getTask(this.task).then((n) => (this.defaultTask = n));

        this.getDateTime();
        this.loadingData = false;
        this.reset();
      }
    },
  },

  methods: {
    ...mapActions({
      getTask: "task/getTaskInfo",
      editTask: "task/edit",
    }),

    async confirm() {
      console.log(this.taskEdited);
      await this.mountDateTime();
      console.log(this.taskEdited);
      if (this.didUpdate) {
        await this.editTask(this.taskEdited);
        this.close();
        this.$emit("close");
      }
    },

    close() {
      this.date = "";
      this.time = "";
      this.taskEdited = Object.assign({}, {});
      this.defaultTask = Object.assign({}, {});
      this.$emit("close");
    },

    reset() {
      this.getDateTime();
      this.taskEdited = Object.assign({}, this.defaultTask);
    },

    getDateTime() {
      console.log(this.defaultTask.todoUntil);
      if (this.defaultTask.todoUntil) {
        this.date = this.defaultTask.todoUntil.split("T")[0];
        this.time = this.defaultTask.todoUntil.split("T")[1].split(".")[0];
        const aux = this.time.split(':')
        this.time = aux[0] + ':' + aux[1]
      }
    },

    mountDateTime() {
      console.log("entrou:", this.date, " - ", this.time);
      const dateTimeEnd = ":00.000Z";
      const newDateTime = this.date + "T" + this.time + dateTimeEnd;
      this.taskEdited.todoUntil = newDateTime;
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
