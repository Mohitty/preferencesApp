<template>
  <oc-app-side-bar class="uk-padding-small uk-overflow-auto uk-height-1-1" :disableAction="false" @close="close()">
    <template slot="title" v-if="items.length === 1">
      <div class="uk-inline">
        <oc-icon :name="fileTypeIcon(items[0])" size="large" />
      </div>
      <div class="uk-inline">
        <div class="uk-flex uk-flex-middle">
          <span class="uk-margin-small-right">{{ getTabName }}</span> <oc-icon name="link" aria-label="Close"/>
        </div>
        <div>
          <oc-star class="uk-inline" :shining="items[0].starred"/> {{ items[0].size | fileSize }}, {{ formDateFromNow(items[0].mdate) }}
        </div>
      </div>
    </template>
    <template slot="title" v-if="items.length > 1">
      <div class="uk-inline">
        <div class="uk-flex uk-flex-middle">
          <span class="uk-margin-small-right">{{ getTabName }}</span>
        </div>
      </div>
    </template>
    <template slot="content">
      <oc-tabs>
          <oc-tab-item :active="key == activeTab" @click="activeTab = key" v-for="(tab, key) of fileSideBars" :key="tab.name">
            {{ tab.component.title($gettext) }}
          </oc-tab-item>
      </oc-tabs>
      <component v-if="fileSideBars.length > 0" v-bind:is="activeTabComponent.component" @reload="$emit('reload')"></component>
    </template>
  </oc-app-side-bar>
</template>

<script>
import Mixins from '../mixins'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [Mixins],
  props: ['items'],
  name: 'FileDetails',
  data: function () {
    return {
      /** String name of the tab that is activated */
      activeTab: 0
    }
  },
  methods: {
    ...mapActions('Files', ['deleteFiles']),
    close () {
      this.$emit('reset')
    },
    showSidebar (app) {
      this.activeTab = app
    },
    downloadFiles () {
      this.downloadFile(this.items[0])
    },
    deleteSelectedFiles () {
      this.deleteFiles({
        client: this.$client,
        files: this.items
      })
    }
  },
  computed: {
    ...mapGetters(['getToken', 'fileSideBars']),
    getTabName () {
      if (this.items.length === 0) {
        return ''
      }
      if (this.items.length > 1) {
        return this.$gettext('Multiple Files')
      } else {
        // return (this.items[0].name.length > 16) ? `${this.items[0].name.substr(0, 10)}...` : this.items[0].name
        return this.items[0].name
      }
    },
    activeTabComponent () {
      return this.fileSideBars[this.activeTab]
    }
  }
}
</script>
