export const state = () => ({
  loggedIn: false,
});

export const actions = {
  getCurrentUser({ commit }) {
    var auth = localStorage.getItem("auth");
    if (auth) {
      commit("loggedIn", true);
    }
    return JSON.parse(auth);
  },

  getUserById({ commit }, id) {
    return this.$axios.$get(`/users/${id}`);
  },

  login({ commit }, userData) {
    let res = this.$axios.post("/user/login", userData).then((resp) => {
      localStorage.setItem("auth", JSON.stringify(resp.data)),
        commit("loggedIn", true);
      this.$router.push('/task/readAll');
      this.$axios.setToken(resp.data.token);
    });
    return res;
  },

  logout() {
    localStorage.removeItem("auth");
    this.$axios.setToken(null);
  },

  register({ commit }, userData) {
    let res = this.$axios.post("/user", userData).then((resp) => {
      localStorage.setItem("auth", JSON.stringify(resp.data)),
        commit("loggedIn", true);
      this.$axios.setToken(resp.data.token);
    });
    return res;
  },

  edit({ commit }, userData) {
    const id = userData.id;
    delete userData.id;
    let res = this.$axios.put(`/user/${id}`, userData).then((resp) => {
      localStorage.setItem("auth", JSON.stringify(resp.data)),
        commit("loggedIn", true);
    });
    return res;
  },

  delete({ commit }, userData) {
    const id = userData.id;
    delete userData.id;
    localStorage.removeItem("auth");
    this.$axios.setToken(null);
    return this.$axios.delete(`/user/${id}`, userData);
  },
};

export const mutations = {
  loggedIn(state, value) {
    state.loggedIn = value;
  },
};
