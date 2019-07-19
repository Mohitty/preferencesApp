<template>
  <div id="preferences-app-bar" class="oc-app-bar">
    <oc-grid flex gutter="small">
      <div class="uk-width-auto">
        <oc-drop></oc-drop>
      </div>
      <div class="uk-width-expand uk-text-center">
        <h2><strong>Settings</strong></h2>
      </div>
      <div class="uk-width-auto uk-text-right">
        <oc-button icon="close" @click="closeApp"></oc-button>
      </div>
    </oc-grid>
  </div>
</template>
<script>

export default {
  methods: {
    closeApp () {
      this.$router.push({
        path: '/files'
      })
    }
  }
}
</script>

<style>
body {
  color: black
}
h3 {
  color: darkblue
}
</style>
