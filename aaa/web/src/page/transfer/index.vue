<template>
  <div class="plat-content">
    <div class="plat-content-con">
      <h4 class="t_nav">&#12288;操作结果</h4>
      <hr>
      <div class="container">
        <div v-if="data.result" class="success-container">
          <span class="glyphicon glyphicon-ok success"></span>
        </div>
        <div v-else class="failed-container">
          <span class="glyphicon glyphicon-remove failed"></span>
        </div>
        <br/>
        <br/>
        <div class="title center">{{ data.title || '操作成功！' }}</div>
        <div v-if="data.subtitle" class="subtitle center">{{ data.subtitle }}</div>
        <br/>
        <br/>
        <button v-for="btn of data.buttons" @click="to(btn.link)" class="btn btn-primary">{{ btn.text }}</button>
        <button v-if="data.back != false " @click="back" class="btn btn-primary">{{ data.back || '返回' }}
          <span class="glyphicon glyphicon-share-alt"></span>
        </button>
      </div>
    </div>
  </div>
</template>

/**
*
* 调用方式：
*
* this.$transfer({
*   result: true/false; 如果为true显示成功样式，false显示失败样式  默认为true
*   back: '返回', // 如果不需要这个按钮，传false来， 默认为返回上一级
*   title: '操作成功！', // 默认显示  操作成功！
*   subtitle: 'xxxx', // 默认不显示
*   buttons: [{
*     text: '去列表',
*     link: '/system/role',
*   }, {}],
* });
*
*/
<script>
  export default {
    name: 'transfer',
    data() {
      return {
        data: {
          result: true,
          title: '操作成功！',
          subtitle: null,
          back: '返回',
          buttons: [],
        },
      };
    },
    methods: {
      to(link) {
        this.$router.push(link);
      },
      back() {
        this.$router.go(-1);
      },
    },
    mounted() {
      let data;
      try {
        const params = this.$route.params.data;
        if (params && typeof params === 'string') {
          data = JSON.parse(decodeURIComponent(params));
        } else {
          data = data || {};
        }
      } catch (ignore) {
        // do nothing
      }
      this.data = Object.assign({}, this.data, data);
    },
  };
</script>

<style lang="scss" scoped>
  @import 'index.scss';
</style>
