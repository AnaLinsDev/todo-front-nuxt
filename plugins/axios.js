export default function ({ $axios, redirect, store }) {
  $axios.onRequest(() => {
    if (getUserToken()) {
      $axios.setToken(getUserToken())

      if(!store.$auth.$state.loggedIn) {
        store.commit("user/loggedIn", true)
      }
    } else {
      store.commit("user/loggedIn", false)
    }
  });

  $axios.onError((error) => {
    store.commit('alert/manage', {
      text: error.response?.data?.message,
      type: 'error',
      open: true
  })
    const code = parseInt(error.response && error.response.status);
    if (code === 403) {
      redirect("/login");
    }
  });
}

export const getUserToken = () => {
  var auth = localStorage.getItem("auth");
  if (auth) {
    return JSON.parse(auth).token;
  }
  return null
};
