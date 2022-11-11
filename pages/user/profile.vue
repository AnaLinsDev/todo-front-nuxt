<template>
  <div>
    <ModalDeleteConfirm
      :open-dialog="modalDelete"
      text="User"
      :name="user.name"
      @confirm="deleteAccount"
      @close="modalDelete = false"
    />
    <v-card class="card pa-6" max-width="800" rounded>
      <h1 v-if="isProfile">Profile</h1>
      <h1 v-else>Edit User</h1>

      <div class="text-field">
        <v-form v-model="valid">
          <v-col>
            <label for="name">Name</label>
            <v-text-field
              id="name"
              v-model="user.name"
              :readonly="isProfile"
              :rules="[rules.required, rules.counter_min_3]"
              solo
            />

            <label for="email">Email</label>
            <v-text-field
              v-model="user.email"
              :readonly="isProfile"
              :rules="[rules.required, rules.counter_min_6, rules.email]"
              solo
            />

            <span v-if="!isProfile">
              <label for="password">Password</label>
              <v-text-field
                v-model="user.password"
                :readonly="isProfile"
                :rules="[rules.counter_min_6_optional]"
                clearable
                type="password"
                solo
              />

              <label for="confirm_password">Confirm Password</label>
              <v-text-field
                v-model="confirmPassword"
                :readonly="isProfile"
                :rules="[rules.counter_min_6_optional]"
                :error-messages="errorConfirmPassword"
                clearable
                type="password"
                solo
              />
              {{ user.password.length == 0 }}
            </span>
          </v-col>
        </v-form>
      </div>

      <div v-if="error != ''" class="error-message">
        {{ error }}
      </div>

      <div class="d-flex justify-center" v-if="isProfile">
        <v-btn class="btn-blue" @click="isProfile = false"> Edit </v-btn>
        <v-btn class="btn-red ml-5" @click.stop="modalDelete = true">
          Delete
        </v-btn>
      </div>

      <div class="d-flex justify-center" v-else>
        <v-btn class="btn-blue" :disabled="!valid" @click="editAccount">
          Confirm Edit
        </v-btn>

        <v-btn class="ml-5" text @click="isProfile = true"> Cancel </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ModalDeleteConfirm from "../../components/ModalDeleteConfirm.vue";
import MixinRules from "@/mixins/MixinRules.vue";

export default {
  components: { ModalDeleteConfirm },
  mixins: [MixinRules],
  data() {
    return {
      isProfile: true,
      error: "",
      valid: false,
      confirmPassword: "",
      errorConfirmPassword: "",
      modalDelete: false,
      user: {
        id: -1,
        name: "teste",
        email: "teste",
        password: "teste",
      }
    };
  },


  watch: {
    isProfile() {
      this.user.password = "";
      this.error = "";
    },

    confirmPassword() {
      this.errorConfirmPassword = ""
    }
  },

  mounted() {
    this.getUser().then((resp) => this.user = resp)
    this.user.password = "";
  },

  methods: {
    ...mapActions({
      getUser: "user/getCurrentUser",
      editUser: "user/edit",
      deleteUser: "user/delete",
    }),

    prepareData() {
      delete this.user.token;
      if (this.user.password === "") {
        delete this.user.password;
      } else {
        this.errorConfirmPassword = this.user.password === this.confirmPassword ? "" : "Passwords must match"
      }
    },

    editAccount() {
      this.prepareData()

      if (this.errorConfirmPassword === "") {
        this.editUser(this.user)
        .then((resp) => {
          this.isProfile = true
          this.error = "";
        })
      }
    },

    deleteAccount() {
      this.deleteUser(this.user)
    },
  },
};
</script>

<style>
.card {
  text-align: center;
  margin: 150px auto;
}

.text-field {
  text-align: left;
  margin: 25px auto;
  max-width: 400px;
}

.btn-blue {
  background-color: rgb(61, 137, 223) !important;
}

.btn-red {
  background-color: rgb(221, 65, 44) !important;
}

.error-message {
  color: red;
  margin: 20px auto;
  font-size: 18px;
}
</style>
