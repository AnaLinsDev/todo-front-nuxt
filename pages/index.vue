<template>
  <v-card class="card">
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

    <div class="d-flex flex-column" v-if="isLogin">
      <v-btn class="btn-green" :disabled="!valid" @click="login"> Login </v-btn>

      <v-btn text @click="isLogin = false"> Go to Register </v-btn>
    </div>

    <div class="d-flex flex-column" v-else>
      <v-btn class="btn-green" :disabled="!valid" @click="register">
        Register
      </v-btn>

      <v-btn text @click="isLogin = true"> Go to Login </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isLogin: true,
      error: "",
      valid: false,
      user: {
        name: "",
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter_min_3: (value) => value.length >= 3 || "Max 3 characters",
        counter_min_6: (value) => value.length >= 6 || "Max 6 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
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
body {
  background-color: rgb(12, 148, 98);
  background-attachment: fixed;
  background-size: cover;
}

.card {
  text-align: center;
  margin: 250px auto;
  width: 800px;
  padding: 20px;
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
