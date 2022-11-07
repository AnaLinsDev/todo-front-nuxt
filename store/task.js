export const state = () => ({});
  
  export const actions = {

    getTasksByUserId({ commit }, id) {
        return this.$axios.$get(`/task/user/${id}`);
    },

    getTaskInfo({ commit }, taskData) {},

    create({ commit }, taskData) {},
  
    edit({ commit }, taskData) {},
  
    delete({ commit }, taskData) {},
  };
  
  export const mutations = {};
  