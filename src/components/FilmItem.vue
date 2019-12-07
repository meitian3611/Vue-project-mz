<template>
  <div class="film-item">
    <div class="left">
      <img :src="filmInfo.poster" />
    </div>
    <div class="center">
      <h2 class="title">{{ filmInfo.name }}</h2>
      <p
        class="grade"
        :style="{ visibility: filmInfo.grade ? '' : 'hidden' }"
      >
        观众评分：{{ filmInfo.grade }}
      </p>
      <p class="actors">主演：{{ filmInfo.actors | formatActors }}</p>
      <p class="info">{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</p>
    </div>
    <div class="right">
      <button
        class="buy"
        v-show="filmType === 'nowPlaying'"
      >购票</button>
      <button
        class="buy"
        v-show="filmType === 'comingSoon'"
      >预购</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilmItem',
  props: {
    filmInfo: {
      type: Object,
      dafault () {
        return {}
      }
    },
    // 影片类型 nowPlaying  comingSoon
    filmType: {
      validator (value) {
        return ['nowPlaying', 'comingSoon'].indexOf(value) !== -1
      }
    }
  },
  filters: {
    formatActors (value) {
      let temp = value.map(item => item.name)
      return temp.join(',')
    }
  }
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
    padding: 0 15px;
    overflow: hidden;

    .title {
      font-weight: bold;
    }

    p {
      height: 24px;
      line-height: 24px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
