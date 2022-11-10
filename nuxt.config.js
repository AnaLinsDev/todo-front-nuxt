export default {
  ssr: false,

  target: "static",

  components: true,

  buildModules: ["@nuxtjs/vuetify"],

  publicRuntimeConfig: {
    axios: {
      baseURL: "http://127.0.0.1:3001",
    },
  },

  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  plugins: [
    '~/plugins/axios'
  ],

  css: ["~/assets/css/main.css"],
};
