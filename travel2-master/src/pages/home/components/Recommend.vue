<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <router-link 
        tag='li'
        class="item border-bottom"
        :to='"/detail/"+item.id '
        v-for="item of list"
        :key="item.id">
          <!-- 图片 -->
          <img :src="item.imgUrl" class="item-img" />
          <!-- 项目信息 -->
          <div class="item-info">
            <p class="item-title">{{ item.title }}</p>
            <p class="item-desc">{{ item.desc }}</p>
            <button class="item-button">查看详情</button>
          </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props: {
    list: Array,
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';
@import '~@/assets/styles/mixins.styl';

.title {
  // margin-top: 0.2rem;
  line-height: 0.8rem;
  background: #eee;
  text-indent: 0.2rem; //将文本块首行缩进两个字符的宽度
}

.item {
  overflow: hidden;
  display: flex;
  height: 1.9rem;

  .item-img {
    width: 1.7rem;
    height: 1.7rem;
    padding: 0.1rem;
  }

  .item-info {
    flex: 1; 
    padding: 0.1rem;
    min-width: 0;

    .item-title {
      line-height: 0.54rem;
      font-size: 0.32rem;  // 设置文字大小
      ellipis();
    }

    .item-desc {
      line-height: 0.4rem;
      color: #ccc;
      ellipis();
    }

    .item-button {
      line-height: 0.44rem;
      margin-top: 0.16rem;
      background: #ff9300;
      padding: 0 0.2 rem;
      border-radius: 0.06rem;
      color: #fff;
    }
  }
}
</style>