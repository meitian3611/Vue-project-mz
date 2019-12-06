<template>
  <div class="page-home">
    <div class="page-home__view">
      <router-view></router-view>
    </div>

    <mt-tabbar v-model="selected">
      <mt-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id" :href="tab.href">
        <i slot="icon" :class="['iconfont',tab.icon]"></i>
        {{ tab.name }}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui'
export default {
  name: 'Home',
  components: {
    [Tabbar.name]: Tabbar,
    [TabItem.name]: TabItem
  },
  data () {
    return {
      selected: 1,
      tabs: [
        {
          id: 1,
          name: '电影',
          icon: 'icondianying',
          href: '/#/films'
        },
        {
          id: 2,
          name: '影院',
          icon: 'iconyingyuan',
          href: '/#/cinemas'
        },
        {
          id: 3,
          name: '资讯',
          icon: 'iconzixun',
          href: 'javascript:;'
        },
        {
          id: 4,
          name: '我的',
          icon: 'iconwode',
          href: '/#/center'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler (newval) {
        this.selected = newval.meta.tabId
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.page-home {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__view {
    flex: 1;
    overflow-y: auto;
  }
  .mint-tabbar {
    position: static;
    background: #fff;
    .mint-tab-item {
      color: #797d82;

      &.is-selected {
        background-color: transparent;
        color: #ff5f16;
      }
    }
  }
  .iconfont {
    font-size: 24px;
  }
}
</style>
