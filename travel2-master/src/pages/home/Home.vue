<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>
<script>
import HomeHeader from "./components/Header.vue";
import HomeSwiper from "./components/Swiper.vue";
import HomeIcons from "./components/Icons.vue";
import HomeRecommend from "./components/Recommend.vue";
import HomeWeekend from "./components/Weekend.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend,
  },
  data() {
    return {
      lastCity:"",
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: [],
    };
  },
  computed:{
    ...mapState(["city"])
  },
  methods: {
    getHomeInfo() {
      axios.get("/api/index.json?city+" +this.city)
        .then(this.getHomeInfoSucc);
    },

    getHomeInfoSucc(res) {
      // console.log(res);
      res = res.data;//res.data才是mock里的json数据
      // console.log(“mock”,res);
      if (res.ret && res.data) {
        const data = res.data;
        this.swiperList = data.swiperList;
        this.iconList = data.iconList;
        this.recommendList = data.recommendList;
        this.weekendList = data.weekendList;
      }
    },
  },
  mounted() {
    this.lastCity=this.city;
    this.getHomeInfo();
  },
  activated(){ //页面重新渲染时执行
    if(this.lastCity !== this.city){
      this.lastCity=this.city;
      this.getHomeInfo();
    }
  }
};
</script>

<style>
</style>
