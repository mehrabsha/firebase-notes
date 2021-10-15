export default {
  namespaced: true,

  state: {
    email: "mehrab572@gmail.com"
  },
  getters: {
    getEmail: state => state.email
  },
  mutations: {
    setEmail: (state, email) => (state.email = email)
  },
  actions: {
    setEmail({ commit }, email) {
      commit("setEmail", email);
    }
  }
};
