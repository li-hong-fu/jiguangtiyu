import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapse: false
  },
  mutations: {
    updateCollapseStatus(state, status) {
      if (status == null) {
        state.collapse = !state.collapse;
      } else {
        state.collapse = status;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
