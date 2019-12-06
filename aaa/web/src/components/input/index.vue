<template>
  <div class="input-box">
    <span :class="iconObj[type]"/>
    <input type="text"
          class="input"
          :class="typeObj[type]" :value="value"
          @input="updateVal($event.target.value)"
          @change="handler"/>
  </div>
</template>

<script>

export default {
  name: 'qc-input',
  props: {
    value: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    handler: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      typeObj: {
        text: 'input-text',
        search: 'input-search'
      },
      iconObj: {
        search: 'icon-search'
      }
    }
  },
  methods: {
    updateVal (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
   @import 'index.scss';
</style>
