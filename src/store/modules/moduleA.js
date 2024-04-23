import axios from "axios";

export default {
  namespaced: true, //开启namespace:true，该模块就成为命名空间模块了
  state: {
    count: 100,
    address: "",
  },
  mutations: {
    increment1(state) {
      state.count++;
    },
    mutationA(state, { address }) {
      state.address = address;
    },
  },
  actions: {
    //  context:{
    // 		state,         若在模块中则为局部状态
    // 		rootState,    根节点状态,
    // 		commit,        若在模块中则为局部状态
    // 		dispatch,      若在模块中则为局部状态
    // 		getters        若在模块中则为局部状态
    //      rootGetters   根节点getters,
    //  }
    // 在这个模块中， dispatch 和 commit 都被局部化了
    // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
    async actionA({ commit, dispatch }) {
      const { data } = await axios.post("http://httpbin.org/post", {
        address: "北京市",
        height: 280,
      });

      await dispatch("actionB"); // 分发到本模块的actionB
      await dispatch("actionA", { fruit: "banana" }, { root: true }); // 分发到根模块的actionA
      await dispatch("moduleB/actionA", null, { root: true }); // 分发到B模块的actionA

      commit("mutationA", JSON.parse(data.data)); // 提交到本模块
      commit("increment1", null, { root: true }); // 提交到根模块, null表示没有载荷
      commit("moduleB/mutationA", null, { root: true }); // 提交到其他模块
    },
    async actionB({ commit }) {
      commit("increment1");
    },
  },
  getters: {
    // 模块内部的Getter 接受四个参数：state, getters, rootState, rootGetters
    countWithRootCount(state, getters, rootState, rootGetters) {
      return state.count + rootState.count;
    },
    getterA(state, getters, rootState, rootGetters) {
      return state.count;
    },
    getterB(state, getters, rootState, rootGetters) {
      // 访问 moduleB模块下的 getterA
      return rootGetters["moduleB/getterA"];
    },
    getterC(state, getters, rootState, rootGetters) {
      // 访问 根模块下的 doneHeight
      return rootGetters.doneHeight;
    },
  },
};
