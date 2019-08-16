<template>
  <div id="preferences">
    <preferences-app-bar />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="uk-flex">
        <h3>Document Associations</h3>
      </div>
      <div class="doc-association">
        <div class="drop-down">
          <div class="mimetype">
            <label for="mime-type"><strong>Mime Type</strong></label>
            <dropdown id="mimetype-dropdown" :options="mimetypesList" @input="setMimetype"></dropdown>
          </div>
          <div class="provider">
            <label for="providers"><strong>Providers</strong></label>
            <dropdown id="provider-dropdown" :options="providersList" @input="setProvider" v-model="selectedProvider"></dropdown>
          </div>
        </div>
        <div class="button">
          <button @click="RegisterAppProvider" id="register">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PreferencesAppBar from './PreferencesAppBar.vue'
import Dropdown from './Dropdown.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Preferences',
  components: {
    PreferencesAppBar,
    'dropdown': Dropdown
  },
  data () {
    return {
      loading: false,
      error: null,
      selectedMimeType: '',
      selectedProvider: '',
      providers: null
    }
  },
  created () {
    this.fetchdata()
  },
  watch: {
    '$route': 'fetchdata'
  },
  computed: {
    ...mapGetters(['getToken']),
    ...mapGetters('Preferences', ['mimetypes']),
    mimetypesList () {
      return this.mimetypes
    },
    providersList () {
      return this.providers
    }
  },
  methods: {
    fetchdata () {
      this.loading = true

      const url = 'http://localhost:9998/appregistry/list'

      let myheaders = new Headers()
      myheaders.append('Authorization', 'Bearer ' + this.getToken)

      fetch(url, { method: 'GET', headers: myheaders })
        .then(response => {
          if (response.status === 200) {
            return response.json()
          } else {
            console.log(response)
            throw new Error('get value did not worked')
          }
        })
        .then(jsonRes => {
          this.providers = jsonRes
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.error = error.toString()
          console.error(error)
        })
    },
    setMimetype (mime) {
      this.selectedMimeType = mime
      this.selectedProvider = ''
      console.log(this.selectedMimeType)

      const url = 'http://localhost:9998/preferences/' + this.selectedMimeType

      let myheaders = new Headers()
      myheaders.append('Authorization', 'Bearer ' + this.getToken)

      fetch(url, { mode: 'cors', method: 'GET', headers: myheaders })
        .then(response => {
          if (response.status === 200) {
            return response.text().then(text => {
              console.log(text)
              this.selectedProvider = text
            })
          } else {
            console.log(response)
            throw new Error('get value did not worked')
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    setProvider (appProvider) {
      this.selectedProvider = appProvider
    },
    RegisterAppProvider () {
      const url = 'http://localhost:9998/preferences/' + this.selectedMimeType

      let myheaders = new Headers()
      myheaders.append('Authorization', 'Bearer ' + this.getToken)
      myheaders.append('Content-Type', 'application/json')

      let requestData = { 'value': this.selectedProvider }

      fetch(url, { mode: 'cors', method: 'POST', headers: myheaders, body: JSON.stringify(requestData) })
        .then(response => {
          if (response.status === 200) {
          } else {
            console.log(response)
            throw new Error('Something went wrong on api server!')
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
div.doc-association {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
div.drop-down {
  display: flex;
  justify-content: flex-start;
}
div.mimetype {
  height: 30%;
  color: black;
  padding: 15px 0px 0px 15px;
}
div.provider {
  height: 30%;
  color: black;
  padding: 15px 0px 0px 15px;
}
div.button {
  height: 25%;
  color: black;
  padding: 15px 0px 0px 15px;
}
div.uk-flex {
  padding: 15px 0px 0px 15px;
}
</style>
