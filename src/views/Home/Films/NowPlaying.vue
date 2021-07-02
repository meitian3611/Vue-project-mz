<template>
  <div class="film-list">
    <!-- 无限加载 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经到底了~"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell v-for="(item, index) in filmList" :key="index">
        <router-link :to="'/films/' + item.filmId">
          <FilmItem
            :key="item.filmId"
            :filmInfo="item"
            filmType="nowPlaying"
          ></FilmItem
        ></router-link>
      </van-cell>
    </van-list>
    <!-- <FilmItem
      v-for="item in filmList"
      :key="item.filmId"
      :filmInfo="item"
      filmType="nowPlaying"
    ></FilmItem> -->
  </div>
</template>

<script>
import FilmItem from '@/components/FilmItem'
import { getFilmList } from '../../../api/bannerList'
export default {
  name: 'NoPlaying',
  components: {
    FilmItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      filmList: [],
      pageNum: 1,
    }
  },
  created() {
    getFilmList({
      cityId: 440300,
      pageNum: this.pageNum,
      pageSize: 10,
      type: 1,
      k: 6290999,
    }).then((Response) => {
      let res = Response.data
      this.filmList = res.data.films
    })
  },
  mounted() {},
  methods: {
    onLoad() {
      // 项目中可替换为接口API
      if (this.filmList.length >= 40) {
        this.finished = true
      } else {
        setTimeout(() => {
          this.filmList.forEach((item, index) => {
            if (index < 10) {
              this.filmList.push(item)
            }
          })
          this.loading = false
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss">
@import './film-list.scss';
</style>
