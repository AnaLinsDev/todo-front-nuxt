export const state = () => ({
  user: {
    id: -1,
    name: "",
    email: "",
    token: "",
  },
});

export const actions = {
  login(context, userData) {
    let res = this.$axios.post("/user/login", userData).then((resp) => {
      context.commit("setUserData", resp.data);
      this.$axios.setToken(resp.data.token);
    });
    return res;
  },

  register(context, userData) {
    let res = this.$axios.post("/user", userData).then((resp) => {
      context.commit("setUserData", resp.data);
      this.$axios.setToken(resp.data.token);
    });
    return res;
  },

  edit(context, userData) {
    context.commit("edit", userData);
  },

  delete(context, userData) {
    context.commit("delete", userData);
  },

  profile(context, userData) {
    context.commit("profile", userData);
  },
};

export const mutations = {
  setUserData(state, userData) {
    state.user.id = userData.id;
    state.user.name = userData.name;
    state.user.email = userData.email;
    state.user.token = userData.token;
  },

  edit(state, userData) {
    console.log(userData);
  },

  delete(state, userData) {
    console.log(userData);
  },

  profile(state, userData) {
    console.log(userData);
  },
};
