<template>
  <div></div>
</template>

<script>
  export default {
    name: 'demo',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        lists: [],
      };
    },
    computed: {},
    methods: {},
    watch: {},
    components: {
      'v-test': 'test',
    },
    beforeCreate() {
    },
    cteated() {
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';

</style>
