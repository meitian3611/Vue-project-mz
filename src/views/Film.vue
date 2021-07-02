<template>
  <div class="page-film">
    <div class="film-header" :class="scrollTop > 40 ? 'show-film-header' : ''">
      <div class="goBack" @click="goBack">
        <img src="../assets/leftBack.png" alt="" />
      </div>
      <div class="title">
        {{ detailsData.name }}
      </div>
    </div>
    <div class="lazyImg">
      <img
        v-lazy="bannerImg + '?x-oss-process=image/quality,Q_70'"
        alt="电影海报图"
      />
    </div>
    <div class="film-detail">
      <div class="col">
        <div class="col-name">
          {{ detailsData.name }}
          <span class="col-name-item">
            {{ typeName }}
          </span>
        </div>
        <div class="col-grade" v-if="detailsData.grade">
          <span class="col-grade-item">
            {{ detailsData.grade }}
          </span>
          分
        </div>
      </div>
      <div class="film-category grey-text">
        {{ detailsData.category }}
      </div>
      <div class="film-premiere-time grey-text">
        {{ detailsData.premiereAt | dateFormat }}上映
      </div>
      <div class="film-nation-runtime grey-text">
        {{ detailsData.nation }} | 分钟
      </div>
      <div class="film-synopsis grey-text" :class="downText ? '' : 'hidde'">
        {{ detailsData.synopsis }}
      </div>
      <div class="toggle" @click="downList">
        <img src="../assets/down.png" alt="" :class="downText ? 'upper' : ''" />
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import { getDetailsApi } from '../api/cinemasDetails'
import moment from 'moment'
export default {
  name: 'Film',
  mounted() {
    this.getDetalisList()
    window.addEventListener('scroll', this.handleScroll, true)
  },
  filters: {
    dateFormat(val) {
      if (!val) return val
      return moment.unix(val).format('YYYY-MM-DD')
    },
  },
  data() {
    return {
      paramsId: this.$route.params.id,
      detailsData: '',
      bannerImg: '',
      scrollTop: 0,
      downText: false,
      typeName: '',
    }
  },
  methods: {
    // 监听页面滚动
    handleScroll() {
      this.scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
    },
    // 详情页数据
    getDetalisList() {
      let params = {
        filmId: this.paramsId,
        k: 987768,
      }
      this.$nextTick(() => {
        getDetailsApi(params).then((res) => {
          if (res.data.status === 0) {
            this.detailsData = res.data.data.film
            this.bannerImg = res.data.data.film.poster
            this.typeName = this.detailsData.item.name
            console.log(JSON.parse(JSON.stringify(this.detailsData)))
          }
        })
      })
    },
    // 返回列表页
    goBack() {
      this.$router.go(-1)
    },
    // 下拉展示
    downList() {
      this.downText = !this.downText
    },
  },
}
</script>

<style lang="scss">
.page-film {
  width: 100%;
  height: 100%;
  .divider {
    background: #f4f4f4;
    width: 100%;
    height: 5px;
  }
  .film-header {
    display: flex;
    align-items: center;
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0);
    color: transparent;
    transition: all 0.3s ease;
    width: 100%;
    height: 44px;
    z-index: 1;
    .goBack img {
      margin-left: 0.3125rem;
      width: 30px;
      height: 30px;
    }
    .title {
      line-height: 44px;
      width: 100%;
      text-align: center;
    }
  }
  .show-film-header {
    transition: all 0.3s ease;
    background-color: #fff;
    color: #191a1b;
  }
  .lazyImg {
    width: 100%;
    img {
      width: 100%;
      height: 26vh;
      object-fit: cover;
    }
  }
  .film-detail {
    padding: 0.9375rem;
    .col {
      display: flex;
      justify-content: space-between;
      &-name {
        color: #191a1b;
        font-size: 18px;
        height: 24px;
        line-height: 24px;
        margin-right: 7px;
        &-item {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
        }
      }
      &-grade {
        color: #ffb232;
        font-size: 12px;
        &-item {
          font-size: 18px;
          font-style: italic;
        }
      }
    }
    .grey-text {
      font-size: 14px;
      color: #797d82;
      margin-top: 4px;
    }

    .film-synopsis {
      margin-top: 12px;
      height: 75px;
      transition: all 0.5s ease;
    }
    .hidde {
      height: 38px;
      overflow: hidden;
      transition: all 0.5s ease;
    }
    .toggle {
      text-align: center;
      display: block;
      height: auto;
      width: 20px;
      margin: auto;
      line-height: normal;
      img {
        width: 8px;
        margin: auto;
      }
    }
    .upper {
      transform: rotate(180deg);
    }
  }
}
</style>
