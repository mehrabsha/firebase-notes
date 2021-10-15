export default {
  namespaced: true,

  state: {
    email: ""
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
