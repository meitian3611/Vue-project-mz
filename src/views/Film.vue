<template>
  <div class="page-film">
    <div class="film-header" :class="scrollTop > 30 ? 'show-film-header' : ''">
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
    <div class="actors">
      <div class="actors-header">
        <span class="actors-header-title">演职人员</span>
      </div>
      <div class="actors-list">
        <ul
          class="scroll-wrapper"
          v-for="(item, index) in detailsData.actors"
          :key="index"
        >
          <li class="scroll-item">
            <div class="scroll-item-con">
              <div class="actor-img">
                <img v-lazy="item.avatarAddress" />
              </div>
              <span class="actor-name">{{ item.name }}</span>
              <span class="actor-role">{{ item.role }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="divider"></div>
    <div class="photos">
      <div class="photos-header">
        <div class="title">剧照</div>
        <div class="more">全部<span>(5)</span> ></div>
      </div>

      <div class="scroll-photos">
        <ul
          class="scroll-nav"
          v-for="(item, index) in detailsData.photos"
          :key="index"
        >
          <li class="scroll-nav-item">
            <div class="item-img">
              <img v-lazy="item" alt="剧照" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="divider" style="padding-bottom: 50px"></div>
    <div class="btn">
      <van-button type="warning">选座购票</van-button>
    </div>
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
    height: 8px;
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
  .actors {
    margin-top: 0.625rem;
    &-header {
      padding: 15px;
      &-title {
        color: #191a1b;
      }
    }
    &-list {
      display: flex;
      padding-left: 15px;
      height: 8.75rem;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      .scroll-wrapper {
        display: flex;
        width: 100%;
        .scroll-item {
          width: 5.3125rem;
          min-width: 5.3125rem;
          padding-right: 15px;
          &-con {
            .actor-img {
              width: 5.3125rem;
              height: 5.3125rem;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            span {
              display: block;
              text-align: center;
            }
            .actor-name {
              padding-top: 10px;
              font-size: 12px;
              color: #191a1b;
              width: 85px;
              height: 18px;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .actor-role {
              font-size: 12px;
              color: #797d82;
            }
          }
        }
      }
    }
    &-list::-webkit-scrollbar {
      display: none;
    }
  }
  .photos {
    &-header {
      display: flex;
      padding: 15px;
      justify-content: space-between;
      .more {
        color: #797d82;
        font-size: 14px;
      }
    }
    .scroll-photos {
      display: flex;
      height: 7.1875rem;
      padding-left: 15px;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      overflow-x: auto;
      overflow-y: hidden;
      .scroll-nav {
        display: flex;
        width: 100%;
        &-item {
          padding-right: 15px;
          width: 150px;
          min-width: 150px;
          height: 100px;
          .item-img {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
    .scroll-photos::-webkit-scrollbar {
      display: none;
    }
  }
  .btn {
    width: 100%;
    .van-button {
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 0;
    }
    .van-button--warning {
      background: #ff5f16;
      border: 1px solid #ff5f16;
    }
  }
}
</style>
