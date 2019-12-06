<template>
  <button class="btn"
          :class="typeObj[type]"
          type="button">
    <slot name="before"></slot>
    <span :class="iconObj[type]"></span>
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: 'qc-button',
  props: {
    type: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      typeObj: {
        plus: 'btn-plus',
        trash: 'btn-trash',
        deny: 'btn-deny',
        add: 'btn-add',
        cancel: 'btn-cancel'
      },
      iconObj: {
        plus: 'icon-plus',
        trash: 'icon-bin',
        deny: 'icon-blocked'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
   @import 'index.scss';
</style>
