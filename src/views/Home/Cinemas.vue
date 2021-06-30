<template>
  <div class="page-home-cinemas">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="errorLoad"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item">
      {{ item }}
         </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'Cinemas',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      errorLoad: false,
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>

<style>
</style>
