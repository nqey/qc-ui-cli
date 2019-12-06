<template>
  <div class="container">
    <qc-dialog ref="qcdialog" :style="dialogStyle" >
      <p class="item">Separate multiple resource name with commas</p>
      <qc-input type="text" :value="resource" @input="resource = arguments[0]" class="item"/>
      <div class="item">
        <qc-button type="add" @click.native="addAgents">
          Add Resources
        </qc-button>
        <qc-button type="cancel" class="cancel" @click.native="close">
          cancel
        </qc-button>
      </div>
    </qc-dialog>
    <div class="row">
      <div class="building col-offset-3 col-3">
        <div class="box box-building">
          <span class="title">Building</span>
          <span class="icon icon-cog"/>
          <span class="number">{{buildingTotal}}</span>
        </div>
      </div>
      <div class="idle col-3">
        <div class="box box-idle">
          <span class="title">Idle</span>
          <span class="icon icon-mug"/>
          <span class="number">{{idleTotal}}</span>
        </div>
      </div>
      <div class="statistics col-3">
        <div class="box box-statistics" >
          <div class="col-4">
            <span>ALL</span>
          </div>
          <div class="col-4">
            <span>PHYSICAL</span>
          </div>
          <div class="col-4">
            <span>VIRTUAL</span>
          </div>
          <div class="col-4">
            <span>{{physicalTotal + virtualTotal}}</span>
          </div>
          <div class="col-4">
            <span>{{physicalTotal}}</span>
          </div>
          <div class="col-4">
            <span>{{virtualTotal}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-offset-3 col-9 tab">
        <div class="col-4">
          <div class="col-4" :class="{ active: tag === 'all'}" @click="tab('all')">
            <span>All</span>
          </div>
          <div class="col-4" :class="{ active: tag === 'physical'}" @click="tab('physical')">
            <span>Physical</span>
          </div>
          <div class="col-4" :class="{ active: tag === 'virtual'}" @click="tab('virtual')">
            <span>Virtual</span>
          </div>
        </div>
        <div class="col-4 tab-search text-left">
          <qc-input class="search" type="search" :value="query" @input="query = arguments[0]" :handler="search"/>
        </div>
        <div class="col-4 tab-sort text-right">
          <span class="icon-evil" :class="{ active: sort === 1 }" @click="sort = 1"/>
          <span class="icon-cool" :class="{ active: sort === 2 }" @click="sort = 2"/>
        </div>
      </div>
    </div>
    <div class="row" v-for="(item, i) of agentList" :key="agent + i">
      <div class="col-offset-3 col-9 text-left agent ">
        <div class="col-1 agent-img">
          <img :src="logoObj[item.os]"/>
        </div>
        <div class="col-4 agent-box">
          <span class="icon-display"/>
          <span class="agent-box-font">{{item.name}}</span>
        </div>
        <div class="col-2 agent-box">
          <span class="label" :class="status[item.status]">{{item.status}}</span>
        </div>
        <div class="col-2 agent-box info">
          <span class="icon-info"/>
          {{item.ip}}
        </div>
        <div class="col-3 agent-box">
          <span class="icon-folder"/>
          {{item.location}}
        </div>
        <div class="col-9 agent-box">
          <qc-button type="plus"  @click.native="open($event, item)"/>
          <qc-button type="trash" v-for="(resources, j) of item.resources" :key="resources + j" @click.native="delAgents(item, j)">
            <span slot="before">{{resources}}</span>
          </qc-button>
        </div>
        <div class="col-2 agent-box">
          <qc-button type="deny" v-show="item.status === 'building'">
            deny
          </qc-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAgentsList, upAgents } from '@/config/api'
import centos from '@/assets/os_icons/cent_os.png'
import debian from '@/assets/os_icons/debian.png'
import suse from '@/assets/os_icons/suse.png'
import ubuntu from '@/assets/os_icons/ubuntu.png'
import windows from '@/assets/os_icons/windows.png'

export default {
  name: 'agent',
  data () {
    return {
      logoObj: {
        centos,
        debian,
        suse,
        ubuntu,
        windows
      },
      query: null,
      tag: 'all',
      status: {
        idle: 'box-idle',
        building: 'box-building'
      },
      agent: null,
      resource: null,
      agentList: null,
      agentListView: null,
      sort: 1,
      idleTotal: 0,
      buildingTotal: 0,
      virtualTotal: 0,
      physicalTotal: 0,
      dialogStyle: {
        position: 'absolute',
        top: 0,
        left: 0
      }
    }
  },
  components: {
    'qc-input': () => import('@/components/input'),
    'qc-dialog': () => import('@/components/dialog'),
    'qc-button': () => import('@/components/button')
  },
  methods: {
    async init () {
      this.agentList = await getAgentsList()
      this.agentListView = this.clone(this.agentList)
      this.agentListView.forEach((o) => {
        if (o.status === 'idle') this.idleTotal += 1
        if (o.status === 'building') this.buildingTotal += 1
        if (o.type === 'virtual') this.virtualTotal += 1
        if (o.type === 'physical') this.physicalTotal += 1
      })
    },
    tab (tag) {
      this.tag = tag
      this.search()
    },
    search () {
      this.agentList = this.tag === 'all' ? this.agentListView : this.agentListView.filter(o => o.type === this.tag)
      this.agentList = !this.query ? this.agentList : this.agentList.filter(o => Object.values(o).join('___').toLowerCase().indexOf(this.query.toLowerCase()) > -1)
    },
    async addAgents () {
      this.agent.resources.push(this.resource)
      await upAgents(this.agent.id, this.agent)
      this.close()
    },
    delAgents (item, idx) {
      item.resources.splice(idx, 1)
      upAgents(item.id, item)
    },
    open (e, item) {
      this.clear()
      if (item) {
        this.agent = item
        this.dialogStyle.top = `${e.pageY + 30}px`
        this.dialogStyle.left = `${e.pageX - 30}px`
      }
      this.$refs.qcdialog.open = true
    },
    close () {
      this.clear()
      this.$refs.qcdialog.open = false
    },
    clear () {
      this.resource = null
      this.agent = null
    },
    clone (o) {
      return JSON.parse(JSON.stringify(o))
    }
  },
  mounted () {
    this.init()
    document.body.addEventListener('click', (e) => {
      if (e.target.className === 'icon-plus' || e.target.className === 'btn btn-plus') return false
      if (!document.getElementsByClassName('dialog')[0].contains(e.target)) this.close()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  @import 'index.scss';
</style>
