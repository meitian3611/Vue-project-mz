<template>
  <ul class="mt-tabs">
    <li
      class="mt-tabs__item"
      v-for="(tab, index) in tabs"
      :key="index"
      :valueMy='index'
      :class="{'active': myValue === index}"
      @click="myValue = index"
>
      {{ tab }}
    </li>
    <div
      class="lv-tabs__line"
      :style="lineStyle"
    >
      <span style="width: 56px;"></span>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'mtTabs',
  props: {
    // 控制哪个下标被选择
    value: {
      type: Number,
      default: 0
    },

    tabs: {
      type: Array,
      default () {
        return [
          'a',
          'b'
        ]
      }
    }
  },
  data () {
    return {
      myValue: this.value
    }
  },
  watch: {
    myValue (newVal) {
      // 通知父组件
      this.$emit('Meitian', newVal)
    }
  },
  created () {

  },
  computed: {
    lineStyle () {
      return {
        transform: `translateX(${this.myValue * 100}%)`
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/mixin.scss';
.mt-tabs {
  @include border-bottom;
  height: 50px;
  display: flex;
  transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
  position: sticky;
  top: 0;
  z-index: 9999;
  background: #fff;

  &__item {
    font-size: .875rem;
    flex: 1;
    line-height: 50px;
    text-align: center;

    &.active {
      color: #ff5f16;
    }
  }
  .lv-tabs__line {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    transition: transform 0.3s ease-in;

    span {
      background: #ff5f16;
    }
  }
}
</style>
