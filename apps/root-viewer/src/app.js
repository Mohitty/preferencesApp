import '@babel/polyfill'
const store = require('./store.js')

let rootviewer = import('./RootViewer.vue')

const RootViewer = () => ({
  component: rootviewer
})

const appInfo = {
  name: 'RootViewer',
  id: 'root-viewer',
  icon: 'text',
  isFileEditor: true,
  extensions: [{
    extension: 'root'
  }]
}

const routes = [{
  path: ``,
  components: {
    app: RootViewer
  },
  name: 'root-viewer'
}]

export default define({
  appInfo,
  routes,
  store
})
