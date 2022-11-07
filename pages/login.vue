<template>
  <v-card class="card pa-6" rounded max-width="800">
    <h1 v-if="isLogin">Login</h1>
    <h1 v-else>Register</h1>

    <div class="text-field">
      <v-form v-model="valid">
        <v-text-field
          v-if="!isLogin"
          v-model="user.name"
          :rules="[rules.required, rules.counter_min_3]"
          label="Name"
          outlined
        />

        <v-text-field
          v-model="user.email"
          :rules="[rules.required, rules.counter_min_6, rules.email]"
          label="Email"
          outlined
        />

        <v-text-field
          v-model="user.password"
          :rules="[rules.required, rules.counter_min_6]"
          label="Password"
          clearable
          type="password"
          outlined
        />
      </v-form>
    </div>

    <div v-if="error != ''" class="error-message">
      {{ error }}
    </div>

    <div class="d-flex justify-center" v-if="isLogin">
      <v-btn class="btn-green" :disabled="!valid" @click="login"> Login </v-btn>

      <v-btn text @click="isLogin = false"> Go to Register </v-btn>
    </div>

    <div class="d-flex justify-center" v-else>
      <v-btn class="btn-green" :disabled="!valid" @click="register">
        Register
      </v-btn>

      <v-btn text @click="isLogin = true"> Go to Login </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import MixinRules from "@/mixins/MixinRules.vue";

export default {
  mixins: [MixinRules],
  data() {
    return {
      isLogin: true,
      error: "",
      valid: false,
      user: {
        name: "",
        email: "aaa@gmail.com",
        password: "aaaaaa",
      }
    };
  },

  watch: {
    isLogin() {
      this.error = "";
    },
  },

  methods: {
    ...mapActions({
      loginUser: "user/login",
      registerUser: "user/register",
    }),
    login() {
      delete this.user["name"];
      this.loginUser(this.user)
        .then(() => {
          this.$router.push('/task/readAll')
          this.error = "";
        })
        .catch((err) => (this.error = err.response?.data.message));
    },

    register() {
      this.registerUser(this.user)
        .then(() => {
          this.error = "";
        })
        .catch((err) => (this.error = err.response?.data.message));
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
  margin: 25px auto;
  max-width: 400px;
}

.btn-green {
  background-color: rgb(170, 228, 207) !important;
}

.error-message {
  color: red;
  margin: 20px auto;
  font-size: 18px;
}
</style>
