import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dateFilter: {
      startDate: new Date(),
      endDate: new Date(),
    },
    chosenMail: {},
  },
  mutations: {
    updateSortDates(state, period) {
      state.dateFilter.startDate = new Date(period.startDate);
      state.dateFilter.endDate = new Date(period.endDate);
    },
    chooseMailToRead(state, mail) {
      state.chosenMail = mail;
    },
  },
  getters: {
    getPeriod: (state) => (state.dateFilter),
    getChosenMail: (state) => (state.chosenMail),
  },
  actions: {
    updateDatePicker({ commit }, payload) {
      commit('updateSortDates', payload.period);
    },
    updateChosenMail({ commit }, payload) {
      commit('chooseMailToRead', payload.mail);
    },
  },
  modules: {
  },
});
