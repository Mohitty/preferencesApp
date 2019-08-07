<template>
  <div id="root-viewer">
    <root-viewer-app-bar />
    <div class="uk-flex">
      <iframe :src="iframeElement" height="800" width="800" />
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
    ...mapGetters(['getToken']),
    iframeElement () {
      return this.iframeLocation
    }
  },
  methods: {
    getIframe () {
      console.log(this.getToken)
      this.iframeLocation = 'http://localhost:9998/iframe/open/AtlasExample.root?access_token=' + this.getToken
    }
  }
}
</script>
