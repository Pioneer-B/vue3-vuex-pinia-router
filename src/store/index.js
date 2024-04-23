import { createStore } from "vuex";
import moduleA from "./modules/moduleA";
import moduleB from "./modules/moduleB";
import axios from "axios";

export default createStore({
  // vuex数据在视图中响应式的前提：必须在satte中先定义数据
  state: {
    count: 10,
    name: "why",
    age: 18,
    height: 180,
    fruit: "",
  },
  // 类似于vue中的计算属性
  getters: {
    // Getter 接受两个参数：state  getters
    doneHeight(state) {
      return `身高：${state.height}cm`;
    },
    doneHeightAge(state, getters) {
      return `年龄：${state.age}岁, ${getters.doneHeight}`;
    },
    // 通过让 getter 返回一个函数，来实现给 getter 传参
    getNameAdress: (state) => (address) => {
      return `姓名：${state.name}，地址：${address}`;
    },
  },
  // 使用它来修改数据
  mutations: {
    increment1(state) {
      state.count++;
    },
    increment10(state, { num } = payload) {
      // 习惯性将载荷写成一个对象，这样可以包含多个字段
      state.count = state.count + num;
    },
    mutationA(state, payload) {
      state.fruit = payload.fruit;
    },
    mutationB(state, payload) {
      state.height = payload.height;
    },
  },
  //  类似于methods,用于发起异步请求,比如axios
  actions: {
    //  context:{
    // 		state,   等同于store.$state，若在模块中则为局部状态
    // 		rootState,   根节点状态,
    // 		commit,   等同于store.$commit
    // 		dispatch,   等同于store.$dispatch
    // 		getters   等同于store.$getters,若在模块中则为局部状态
    //      rootGetters   根节点getters,
    //  }
    async actionA({ commit } = content, payload) {
      const { data } = await axios.get("http://httpbin.org/get", {
        params: payload,
      });
      commit("mutationA", data.args);
    },
    async actionB({ dispatch, commit }) {
      await dispatch("actionA", { fruit: "apple" });
      const { data } = await axios.get("http://httpbin.org/get", {
        params: { height: 190 },
      });
      commit("mutationB", data.args);
    },
  },
  // 模块拆分
  modules: {
    moduleA,
    moduleB,
  },
});
