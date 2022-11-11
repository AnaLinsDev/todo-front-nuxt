export const state = () => ({
  text: '',
  open: false,
  type: 'error'
});

export const mutations = {
  manage(state, value) {
    state.text = value.text;
    state.open = value.open;
    state.type = value.type;
  }
};
