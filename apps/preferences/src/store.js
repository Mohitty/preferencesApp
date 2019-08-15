const namespaced = true

const state = {
  mimeTypes: ['application/x-root']
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
