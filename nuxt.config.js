export default {
  ssr: false,

  target: "static",

  buildModules: ["@nuxtjs/vuetify"],

  publicRuntimeConfig: {
    axios: {
      baseURL: "http://127.0.0.1:3001",
    },
  },

  modules: ["@nuxtjs/axios"],
};
