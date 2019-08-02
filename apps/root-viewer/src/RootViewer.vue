<template>
  <div id="root-viewer">
    <root-viewer-app-bar />
    <div class="uk-flex">
      <span v-html="iframeElement"></span>
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
      this.iframeLocation = '<iframe src="http://localhost:9998/iframe/open/file.txt?access-token=' + this.getToken + '" />'
    }
  }
}
</script>
