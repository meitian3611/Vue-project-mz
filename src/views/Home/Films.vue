<template>
  <div class="page-home-films">
    <MtSwiper
      class="swiper"
      :slides="bannerList"
    ></MtSwiper>
    <mtTabs
      v-model="curTabIndex"
      :tabs="['正在热映', '即将上映']"
    ></mtTabs>

    <router-view></router-view>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import Tabs from '@/components/Tabs'
import { getBannerList } from '../../api/bannerList'
export default {
  name: 'Films',
  components: {
    [Swiper.name]: Swiper,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      bannerList: [],
      curTabIndex: this.$route.name === 'nowPlaying' ? 0 : 1 // 当前选中的下标

    }
  },
  watch: {
    curTabIndex (newVal) {
      // 当 curTabIndex 变化时，控制路由跳转
      let name = newVal === 0 ? 'nowPlaying' : 'comingSoon'
      this.$router.replace({ name })
    }
  },
  created () {
    getBannerList({
      type: 2,
      cityId: 440300,
      k: 8601288
    }).then(respone => {
      let res = respone.data
      if (res.status === 0) {
        this.bannerList = res.data.map(item => item.imgUrl)
      }
    })
  }
}
</script>

<style lang="scss">
.page-home-films {
  .swiper {
    --swiper-theme-color: #ffffff;
    .swiper-pagination-bullets {
      left: 280px;
      width: 100%;
      bottom: 10px;
      text-align: left;
    }
  }
}
</style>
