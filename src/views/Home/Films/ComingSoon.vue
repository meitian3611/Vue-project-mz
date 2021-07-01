<template>
  <div class="film-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经到底了~"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell v-for="(item, index) in filmList" :key="index">
        <FilmItem
          :key="item.filmId"
          :filmInfo="item"
          filmType="comingSoon"
        ></FilmItem>
      </van-cell>
    </van-list>
    <!-- <FilmItem
      v-for="item in filmList"
      :key="item.filmId"
      :filmInfo="item"
      filmType="comingSoon"
    ></FilmItem> -->
  </div>
</template>

<script>
import FilmItem from '@/components/FilmItem'
import { getFilmList } from '../../../api/bannerList'
export default {
  name: 'ComingSoon',
  components: {
    FilmItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      filmList: [],
    }
  },
  created() {
    getFilmList({
      cityId: 440300,
      pageNum: 1,
      pageSize: 10,
      type: 2,
      k: 6290999,
    }).then((Response) => {
      let res = Response.data
      this.filmList = [...this.filmList, ...res.data.films]
    })
  },
  methods: {
    onLoad() {
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
