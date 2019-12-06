<template>
  <div class="film-item">
    <div class="left">
      <img src="https://pic.maizuo.com/usr/movie/13f8328c272f9962d457131878e5f652.jpg?x-oss-process=image/quality,Q_70" alt="">
    </div>
    <div class="center">
      <h2 class="title">勇敢者游戏2：再战巅峰</h2>
      <p class="grade">观众评分：7.9</p>
      <p class="actors">主演：张三，李四</p>
      <p class="info">美国 | 144分钟</p>
    </div>
    <div class="right">
      <button class="buy">购票</button>
    </div>
  </div>
</template>

<script>
export default {

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
