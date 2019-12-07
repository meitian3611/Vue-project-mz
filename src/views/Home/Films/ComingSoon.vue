<template>
  <div class="film-list">
    <FilmItem
      v-for="item in filmList"
      :key="item.filmId"
      :filmInfo="item"
      filmType='comingSoon'

    ></FilmItem>
  </div>
</template>

<script>
import FilmItem from '@/components/FilmItem'
import { getFilmList } from '../../../api/bannerList'
export default {
  name: 'ComingSoon',
  components: {
    FilmItem
  },
  data () {
    return {
      filmList: []
    }
  },
  created () {
    getFilmList({
      cityId: 440300,
      pageNum: 1,
      pageSize: 10,
      type: 2,
      k: 6290999
    }).then(Response => {
      let res = Response.data
      this.filmList = [...this.filmList, ...res.data.films]
    })
  }
}
</script>

<style lang="scss">
@import './film-list.scss';
</style>
