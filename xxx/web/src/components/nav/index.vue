<template>
  <nav class="navbar-left">
    <ul class="navbar-left-menu">
      <router-link tag="li" to="#1">
        <span class="icon-profile"/>
        <span>个人简介</span>
      </router-link>
      <router-link tag="li" to="/agent">
        <span class="icon-home"/>
        <span>主页</span>
      </router-link>
      <router-link tag="li" to="#2">
        <span class="icon-magnet"/>
        <span>代理</span>
      </router-link>
      <router-link tag="li" to="#3">
        <span class="icon-question"/>
        <span>HELP</span>
      </router-link>
    </ul>
    <div class="navbar-left-log">
      <p class="h1">History</p>
      <ul>
        <li v-for="(l, i) in logs" :key="i">
          <span class="disc"></span>
          {{l.log}}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { getLogs } from '@/config/api'

export default {
  name: 'lnav',
  data () {
    return {
      logs: []
    }
  },
  async mounted () {
    this.logs = await getLogs()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
   @import 'index.scss';
</style>
