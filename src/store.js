import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    timer: 0,
    scaleRotatedByDeg: 0
  },
  mutations: {
    incrementTimer: state => state.timer++,
    incrementRotation: state => state.scaleRotatedByDeg++,
    decrementRotation: state => state.scaleRotatedByDeg--
  }
});

export default store;