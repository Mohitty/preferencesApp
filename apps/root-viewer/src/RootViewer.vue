<template>
  <div id="root-viewer">
    <root-viewer-app-bar />
    <div class="viewer">
      <div class="iframe-container">
        <iframe class="viewer-iframe" :src="iframeElement" scrolling="yes" />
      </div>
    </div>
  </div>
</template>
<script>
import RootViewerAppBar from './RootViewerAppBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'RootViewer',
  data () {
    return {
      iframeLocation: ''
    }
  },
  mounted () {
    this.getIframe()
  },
  components: {
    RootViewerAppBar
  },
  computed: {
    ...mapGetters(['getToken', 'activeFile']),
    iframeElement () {
      return this.iframeLocation
    }
  },
  methods: {
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
  padding-bottom: 25px;
  border: 0 none;
  box-sizing: border-box;
}
</style>
