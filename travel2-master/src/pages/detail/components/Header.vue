<template>
  <div>
    <!-- 返回箭头 -->
    <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <!-- 景点详情 -->
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
      <router-link to="/">
        <div class="iconfont header-fix-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader",
  data() {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0,
      },
    };
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop;
      if (top > 60) {
        let opacity = top / 140;
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = { opacity };
        this.showAbs = false;
      } else {
        this.showAbs = true;
      }
    },
  },
  //使用keep-alive后 每次页面展示时执行activated钩子
  activated() {
    window.addEventListener("scroll", this.handleScroll);
  },
  // 页面即将被隐藏或被新页面替换时执行
  deactivated() {
    // 对事件进行解绑,防止在其他页面也触发
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';

.header-abs {
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  width: 0.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-radius: 0.4rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);

  .header-abs-back {
    color: #fff;
    font-size: 0.4rem;
  }
}

.header-fixed {
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: $headerHeight;
  line-height: $headerHeight;
  text-align: center;
  color: #fff;
  background: $bgColor;
  font-size: 0.32rem;

  .header-fix-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.64rem;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
  }
}
</style>