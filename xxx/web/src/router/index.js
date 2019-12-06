import Vue from 'vue'
import Router from 'vue-router'
import agent from '@/page/agent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/agent',
      name: 'agent',
      component: agent,
      meta: {
        keepAlive: false
      }
    }
  ]
})
