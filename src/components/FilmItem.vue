<template>
  <div class="film-item">
    <div class="left">
      <img v-lazy="filmInfo.poster" />
    </div>
    <div class="center">
      <h2 class="title">
        {{ filmInfo.name }}
        <span class="title-type">{{ filmInfo.filmType.name }}</span>
      </h2>
      <p class="grade" :style="{ visibility: filmInfo.grade ? '' : 'hidden' }">
        观众评分 <span style="color: #ffb232">{{ filmInfo.grade }}</span>
      </p>
      <p class="actors">主演：{{ filmInfo.actors | formatActors }}</p>
      <p v-show="filmType === 'nowPlaying'" class="info">
        {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
      </p>
      <p v-show="filmType === 'comingSoon'" class="info">
        上映日期: {{ filmInfo.premiereAt | dateFormat }}
      </p>
    </div>
    <div class="right">
      <button class="buy" v-show="filmType === 'nowPlaying'">购票</button>
      <button class="buy" v-show="filmType === 'comingSoon'">预购</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'FilmItem',
  props: {
    filmInfo: {
      type: Object,
      dafault() {
        return {}
      },
    },
    // 影片类型 nowPlaying  comingSoon
    filmType: {
      validator(value) {
        return ['nowPlaying', 'comingSoon'].indexOf(value) !== -1
      },
    },
  },
  filters: {
    dateFormat(value) {
      if (!value) return ''
      let date = moment.unix(value).format('MM月DD日')
      let week = moment.unix(value).day()
      switch (week) {
        case 1:
          week = '周一'
          break
        case 2:
          week = '周二'
          break
        case 3:
          week = '周三'
          break
        case 4:
          week = '周四'
          break
        case 5:
          week = '周五'
          break
        case 6:
          week = '周六'
          break
        case 0:
          week = '周日'
          break
      }
      return week + ' ' + date
    },
    formatActors(value) {
      let temp = value.map((item) => {
        return item.name
      })
      return temp.join(',')
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/styles/mixin.scss';

.film-item {
  @include border-bottom;
  display: flex;
  align-items: center;
  padding: 15px 15px 15px 0;
  height: 94px;

  .left {
    width: 66px;
    flex-shrink: 0;

    img {
      width: 100%;
    }
  }

  .right {
    display: flex;
    align-items: center;
    width: 50px;
    flex-shrink: 0;

    button {
      width: 50px;
      height: 25px;
    }
  }

  .center {
    flex: 1;
    line-height: 1.5;
    padding: 0 10px;
    overflow: hidden;
    font-size: 1rem;

    .title {
      color: #191a1b;
      font-weight: normal;
      white-space: nowrap;
      &-type {
        font-size: 12px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
      }
    }

    p {
      font-size: 0.8125rem;
      color: #797d82;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
