<template>
  <div>
    <select v-model="selectedOption" @input="event => {$emit('input', event.target.value) }">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>
<script>

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: null,
      default: ''
    }
  },
  data () {
    return {
      selectedOption: ''
    }
  },
  mounted () {
    this.selectedOption = this.value
    console.log(this.options)
  },
  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  }
}
</script>
