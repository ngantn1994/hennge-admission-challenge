import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dateFilter: {
      startDate: new Date(),
      endDate: new Date(),
    },
  },
  mutations: {
    updateSortDates(state, period) {
      state.dateFilter.startDate = new Date(period.startDate);
      state.dateFilter.endDate = new Date(period.endDate);
    },
  },
  getters: {
    getPeriod: (state) => (state.dateFilter),
  },
  actions: {
    updateDatePicker({ commit }, payload) {
      commit('updateSortDates', payload.period);
    },
  },
  modules: {
  },
});
