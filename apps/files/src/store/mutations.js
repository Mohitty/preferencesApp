export default {
  UPDATE_FILE_PROGRESS (state, progress) {
    let fileIndex = state.inProgress.findIndex((f) => {
      return f.name === progress.fileName
    })
    if (fileIndex === -1) return
    state.inProgress[fileIndex].progress = progress.progress
  },
  REMOVE_FILE_FROM_PROGRESS (state, file) {
    let fileIndex = state.inProgress.findIndex((f) => {
      return f.name === file.name
    })
    state.inProgress.splice(fileIndex - 1, 1)
  },
  ADD_FILE_TO_PROGRESS (state, file) {
    state.inProgress.push({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      progress: 0,
      action: 'upload'
    })
  },
  LOAD_FILES (state, { currentFolder, files }) {
    state.currentFolder = currentFolder
    state.files = files
  },
  LOAD_FILES_SEARCHED (state, files) {
    state.filesSearched = files
  },
  ADD_FILE_SELECTION (state, file) {
    state.selected.push(file)
  },
  REMOVE_FILE_SELECTION (state, file) {
    if (state.selected.length > 1) {
      state.selected = state.selected.filter(i => ![file].includes(i))
      return
    }
    state.selected = []
  },
  RESET_SELECTION (state) {
    state.selected = []
  },
  FAVORITE_FILE (state, item) {
    let fileIndex = state.files.findIndex((f) => {
      return f.name === item.name
    })
    state.files[fileIndex].starred = !item.starred
  },
  ADD_FILE (state, file) {
    state.files.push(file)
  },
  REMOVE_FILE (state, file) {
    state.files = state.files.filter(i => ![file].includes(i))
  },
  SET_SEARCH_TERM (state, searchTerm) {
    state.searchTermGlobal = searchTerm
  },
  SET_FILTER_TERM (state, filterTerm) {
    state.searchTermFilter = filterTerm
  },
  SET_FILE_FILTER (state, filter) {
    let i = state.fileFilter.findIndex((f) => {
      return f.name === filter.name
    })
    state.fileFilter[i].value = filter.value
  },
  RENAME_FILE (state, { file, newValue, newPath }) {
    let fileIndex = state.files.findIndex((f) => {
      return f.id === file.id
    })
    let ext = ''
    let name = newValue
    let baseName = newValue
    if (file.type !== 'dir') {
      const ex = name.match(/\.[0-9a-z]+$/i)
      if (ex !== null) {
        ext = ex[0].substr(1)
        baseName = name.substring(0, name.length - ext.length - 1)
      }
    }

    state.files[fileIndex].name = name
    state.files[fileIndex].basename = baseName
    state.files[fileIndex].extension = ext
    state.files[fileIndex].path = '/' + newPath + newValue
  },
  DRAG_OVER (state, value) {
    state.dropzone = value
  },
  SHARES_SET_OPEN (state, index) {
    state.shareOpen = index
  },
  SHARES_LOAD (state, shares) {
    state.shares = shares
  },
  SHARES_ADD_SHARE (state, share) {
    state.shares.push(share)
  },
  SHARES_REMOVE_SHARE (state, share) {
    state.shares = state.shares.filter(i => ![share].includes(i))
  },
  SHARES_UPDATE_SHARE (state, share) {
    let fileIndex = state.shares.findIndex((s) => {
      return s.info.id === share.info.id
    })
    state.shares[fileIndex].role = share.role
  },
  SHARES_ERROR (state, error) {
    state.shares = []
    state.sharesError = error
  },
  SHARES_LOADING (state, loading) {
    state.sharesLoading = loading
  },
  UPDATE_FOLDER_LOADING (state, value) {
    state.loadingFolder = value
  },
  CHECK_QUOTA (state, freeSpace) {
    state.freeSpace = freeSpace
  },
  SET_TRASHBIN_DELETE_CONFIRMATION (state, message) {
    state.trashbinDeleteMessage = message
  }
}
