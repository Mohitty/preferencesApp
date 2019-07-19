const namespaced = true

const state = {
  mimeTypes: ['text/plain', 'application/pdf', 'text/html', 'application/javascript']
}

const actions = {
}

const mutations = {
}

const getters = {
  mimetypes: state => {
    return state.mimeTypes
  }
}

export default {
  namespaced,
  state,
  actions,
  mutations,
  getters
}
