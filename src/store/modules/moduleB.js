import axios from "axios";

export default {
  namespaced: true,
  state: {
    count: 1000,
    job: "",
  },
  mutations: {
    mutationA(state) {
      state.count = state.count + 1;
    },
    mutationB(state, { job }) {
      state.job = job;
    },
  },
  actions: {
    async actionA({ commit }) {
      const { data } = await axios.post("http://httpbin.org/post", {
        job: "网管",
      });
      commit("mutationB", JSON.parse(data.data));
    },
  },
  getters: {
    getterA(state, getters, rootState, rootGetters) {
      return state.count;
    },
  },
};
