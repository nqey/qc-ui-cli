<template>
  <div class="img-circle" :style="{ width: diameter + 'px',  height: diameter + 'px' }">
    <img :src="url" alt="40x40">
  </div>
</template>

<script>
import avatar from '@/assets/avatar/qinchao.jpg'

export default {
  name: 'img-circle',
  props: {
    diameter: {
      type: Number,
      default: 40
    },
    url: {
      type: String,
      default: avatar
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
   @import 'index.scss';
</style>
