const namespaced = true

const state = {
  loading: false,
  lastError: null
}

const actions = {
  clearLastError ({ commit }) {
    commit('ERROR', '')
  },
  isLoading ({ commit }, value) {
    commit('LOADING', value)
  },
  newError ({ commit }, value) {
    commit('ERROR', value)
  }
}

const mutations = {
  LOADING (state, loading) {
    state.loading = loading
  },
  ERROR (state, errorMessage) {
    state.lastError = errorMessage
  }
}

const getters = {
  loading: state => {
    return state.loading
  },
  lastError: state => {
    return state.lastError
  }
}

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters
}
