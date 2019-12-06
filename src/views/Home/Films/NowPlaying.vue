<template>
  <div class="film-list">
    <FilmItem
      v-for="item in 10"
      :key="item.index"
    ></FilmItem>
  </div>
</template>

<script>
import FilmItem from '@/components/FilmItem'
import { getFilmList } from '../../../api/bannerList'
// import Axios from 'axios'
export default {
  name: 'NoPlaying',
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
      type: 1,
      k: 6290999
    }).then(Response => {
      let res = Response.data
      console.log(res)
    })
    // Axios
    //   .get(
    //     'https://localhost:8080/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2887540'
    //   )
    //   .then(res => {
    //     console.log(res.data)
    //   })
  }
}
</script>

<style lang="scss">
@import './film-list.scss';
</style>
