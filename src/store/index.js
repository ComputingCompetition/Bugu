import { createStore } from "vuex";
import userInfo from './modules/userInfo';
// 定义页面变量
export default createStore({
  state: {

  },
  // 计算属性
  getters: {
    idInfo(state) {
      return state.userId;
    }
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id;
    },
  },
  // actions: {},
  modules: {
    userInfo
  },
  getters: {
    isLogined: state => {
      return state.userInfo.online
    }
  },

});
