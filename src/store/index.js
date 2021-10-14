import { createStore } from "vuex";
import notes from "./notes";

export default createStore({
  modules: {
    notes
  },
  state: {
    test: "test"
  },
  mutations: {},
  actions: {}
});
