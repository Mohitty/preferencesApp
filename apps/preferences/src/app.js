import '@babel/polyfill'
import translationsJson from '../l10n/translations'

const store = require('./store.js')

let preferences = import('./Preferences.vue')

const Preferences = () => ({
  component: preferences
})

const appInfo = {
  name: 'Preferences',
  id: 'preferences',
  icon: 'text',
  isFileEditor: false,
  extensions: [{
    extension: ''
  }]
}

const navItems = [
  {
    name: 'Preferences',
    iconMaterial: appInfo.icon,
    route: {
      name: 'preferences',
      path: `/preferences`
    }
  }
]

const routes = [{
  path: ``,
  components: {
    app: Preferences
  },
  name: 'preferences'
}]

const translations = translationsJson
export default define({
  appInfo,
  navItems,
  routes,
  store,
  translations
})
