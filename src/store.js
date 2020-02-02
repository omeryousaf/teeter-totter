import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    timer: 0,
    scaleRotatedByDeg: 0,
    scaleCenter: {
      x: 0,
      y: 0
    },
    torqueOnLeft: 0,
    torqueOnRight: 0,
    isLeftKeyPressed: false,
    isRightKeyPressed: false
  },
  mutations: {
    toggleLeftKeyPressed(state) {
      state.isLeftKeyPressed = !state.isLeftKeyPressed;
    },
    toggleRightKeyPressed(state) {
      state.isRightKeyPressed = !state.isRightKeyPressed;
    },
    setTorqueLeft(state, torque) {
      state.torqueOnLeft = torque;
    },
    setTorqueRight(state, torque) {
      state.torqueOnRight += torque;
    },
    setScaleCenter(state, coordinates) {
      state.scaleCenter = coordinates;
    },
    incrementTimer(state) {
      state.timer++
    },
    incrementRotation(state) {
      state.scaleRotatedByDeg += 0.1;
    },
    decrementRotation(state) {
      state.scaleRotatedByDeg -= 0.1;
    },
    setZeroRotation(state) {
      state.scaleRotatedByDeg = 0;
    }
  }
});

export default store;