const namespaced = true

const state = {
  touched: false,
  loading: false,
  currentFile: '',
  lastError: null
}

const actions = {
  clearLastError ({ commit }) {
    commit('ERROR', '')
  },
  load ({ commit }, value) {
    commit('LOAD', value)
  },
  saveFile ({ commit }) {
    commit('SAVE')
  }
}

const mutations = {
  LOADING (state, loading) {
    state.loading = loading
  },
  CURRENT_FILE (state, filePath) {
    state.currentFile = filePath
  },
  ERROR (state, errorMessage) {
    state.lastError = errorMessage
  },
  LOAD (state, value) {
    state.loading = value
  },
  SAVE (state) {
    console.log('file saved')
  }
}

const getters = {
  isTouched: state => {
    return state.touched
  },
  isLoading: state => {
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
