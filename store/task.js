export const actions = {
  getTasksByUserId({ commit }) {
    var auth = localStorage.getItem("auth");
    if (auth) {
      const id = JSON.parse(auth).id;
      return this.$axios.$get(`/task/user/${id}`);
    } else {
      this.$router.push("/login");
    }
  },

  getTaskInfo({ commit }, taskData) {
    return this.$axios.$get(`/task/${taskData.id}`);
  },

  create({ commit }, taskData) {
    var auth = localStorage.getItem("auth");
    if (auth) {
      taskData.userId = JSON.parse(auth).id;
      return this.$axios.$post(`/task`, taskData);
    } else {
      this.$router.push("/login");
    }
  },

  edit({ commit }, taskData) {
    const id = taskData.id
    return this.$axios.$put(`/task/${id}`, taskData);
  },

  delete({ commit }, taskData) {
    const id = taskData.id
    return this.$axios.$delete(`/task/${id}`);
  },
};
