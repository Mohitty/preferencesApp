<template>
  <div id="root-viewer">
    <root-viewer-app-bar />
    <oc-notifications>
      <oc-notification-message
              v-if="lastError"
              :message="lastError"
              status="danger"
              @close="clearLastError"
      />
    </oc-notifications>
    <div class="viewer" v-if="!loading">
      <div class="iframe-container">
        <iframe class="viewer-iframe" :src="iframeElement" scrolling="yes" />
      </div>
    </div>
  </div>
</template>
<script>
import RootViewerAppBar from './RootViewerAppBar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RootViewer',
  data () {
    return {
      iframeLocation: ''
    }
  },
  mounted () {
    this.getAppProvider()
    this.getIframe()
  },
  components: {
    RootViewerAppBar
  },
  computed: {
    ...mapGetters(['getToken', 'activeFile']),
    ...mapGetters('RootViewer', ['loading', 'lastError']),
    iframeElement () {
      return this.iframeLocation
    }
  },
  methods: {
    ...mapActions('RootViewer', ['isLoading', 'clearLastError', 'newError']),
    getAppProvider () {
      this.isLoading(true)
      const url = 'http://localhost:9998/preferences/application/x-root'

      let myheaders = new Headers()
      myheaders.append('Authorization', 'Bearer ' + this.getToken)

      fetch(url, { mode: 'cors', method: 'GET', headers: myheaders })
        .then(response => {
          if (response.status === 200) {
            return response.text().then(text => {
              console.log(text)
              if (text === '') {
                this.newError('No app provider available')
              } else {
                this.isLoading(false)
              }
            })
          } else {
            console.log(response)
            this.newError('No app provider available')
            throw new Error('get value did not worked')
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getIframe () {
      const url = 'http://localhost:9998/iframe/open/' + this.activeFile.path.substr(1) + '?access_token=' + this.getToken
      fetch(url, { mode: 'cors', method: 'GET' })
        .then(response => {
          if (response.status === 200) {
            return response.text().then(text => {
              console.log(text)
              this.iframeLocation = text
            })
          } else {
            console.log(response)
            throw new Error('get value did not worked')
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
.viewer-iframe {
  display: block;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  margin: 0;
  padding: 0;
  padding-bottom: 75px;
  border: 0 none;
  box-sizing: border-box;
}
</style>
