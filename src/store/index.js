import notes from "./notes";
import user from "./user";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notes,
    user
  },
  state: {},
  mutations: {},
  actions: {}
});
